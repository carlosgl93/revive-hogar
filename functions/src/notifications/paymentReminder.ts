import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';

import { verifyFirebaseToken } from '../middleware';

// Route ALL emails to this address until production-ready. Remove to send to real customers.
const EMAIL_OVERRIDE = 'cgumucio93@gmail.com';

const DIAS_MAP: Record<number, string> = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado',
};

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

interface Parada {
  clienteId: string;
  nombre: string;
}

interface OverdueClient {
  nombre: string;
  correo: string;
  telefono: string;
  paykuSubscriptionUrl?: string;
}

// Converted from onSchedule('0 8 * * 1-6') to HTTP endpoint.
// Trigger manually via POST /api/scheduledPaymentReminder
export async function sendPaymentReminder(req: Request, res: Response): Promise<void> {
  try {
    await verifyFirebaseToken(req.headers.authorization);
  } catch {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  const now = new Date();
  const dia = DIAS_MAP[now.getDay()];
  if (!dia) {
    res.json({ message: 'No route scheduled for today (Sunday)', sent: 0, failed: 0 });
    return;
  }

  const mesKey = `${MESES[now.getMonth()]} ${now.getFullYear()}`;
  const db = admin.firestore();

  try {
    const rutaSnap = await db.collection('rutas').doc(dia).get();
    if (!rutaSnap.exists) {
      res.json({ message: `No route found for ${dia}`, sent: 0, failed: 0 });
      return;
    }

    const paradas = (rutaSnap.data()?.paradas ?? []) as Parada[];
    if (paradas.length === 0) {
      res.json({ message: `Route ${dia} has no stops`, sent: 0, failed: 0 });
      return;
    }

    const clienteDocs = await Promise.all(
      paradas.map((p) => db.collection('clientes').doc(p.clienteId).get()),
    );

    const overdueClients: OverdueClient[] = [];

    for (const snap of clienteDocs) {
      if (!snap.exists) continue;
      const data = snap.data()!;
      const pagos = (data.pagos as Record<string, string>) || {};
      const status = pagos[mesKey];

      if (status === 'atrasado' || status === 'pendiente') {
        overdueClients.push({
          nombre: data.nombre,
          correo: data.correo,
          telefono: data.telefono,
          paykuSubscriptionUrl: data.paykuSubscriptionUrl,
        });
      }
    }

    if (overdueClients.length === 0) {
      res.json({ message: `No overdue clients for ${dia} (${mesKey})`, sent: 0, failed: 0 });
      return;
    }

    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });

    let sent = 0;
    let failed = 0;

    for (const client of overdueClients) {
      if (!client.correo) continue;

      const payLink = client.paykuSubscriptionUrl || 'https://revivehogar.cl/pagar';
      const recipient = EMAIL_OVERRIDE || client.correo;

      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'Revive Hogar <cgumucio93@gmail.com>',
          to: recipient,
          subject: 'Revive Hogar - Regulariza tu pago',
          text: `Hola ${client.nombre}! Para poder retirar tu reciclaje hoy, regulariza tu pago aqui: ${payLink}`,
          html: [
            `<p>Hola ${client.nombre}!</p>`,
            `<p>Para poder retirar tu reciclaje hoy, regulariza tu pago <a href="${payLink}">aqui</a>.</p>`,
            `<p>Equipo Revive Hogar</p>`,
          ].join('\n'),
        });
        sent++;
      } catch (err) {
        console.error(`[paymentReminder] Failed to send to ${client.correo}:`, err);
        failed++;
      }
    }

    await db.collection('notificationLogs').add({
      type: 'payment_reminder',
      dia,
      mesKey,
      totalOverdue: overdueClients.length,
      sent,
      failed,
      createdAt: new Date().toISOString(),
    });

    res.json({ dia, mesKey, totalOverdue: overdueClients.length, sent, failed });
  } catch (error) {
    console.error('sendPaymentReminder failed:', error);
    res.status(500).json({ error: 'Payment reminder failed', details: String(error) });
  }
}
