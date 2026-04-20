import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import { verifyFirebaseToken } from '../middleware';

interface CreateUserBody {
  email: string;
  password: string;
  nombre: string;
  role: 'admin' | 'chofer';
}

export async function createUsuario(req: Request, res: Response): Promise<void> {
  try {
    await verifyFirebaseToken(req.headers.authorization);
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { email, password, nombre, role } = req.body as CreateUserBody;

  if (!email || !password || !nombre || !role) {
    res.status(400).json({ error: 'Missing required fields: email, password, nombre, role' });
    return;
  }

  if (!['admin', 'chofer'].includes(role)) {
    res.status(400).json({ error: 'Invalid role. Must be admin or chofer' });
    return;
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: nombre,
    });

    const firestore = admin.firestore();
    await firestore.collection('usuarios').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      nombre,
      role,
      activo: true,
      createdAt: new Date().toISOString(),
    });

    res.json({ uid: userRecord.uid, email, nombre, role });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
}

export async function deleteUsuario(req: Request, res: Response): Promise<void> {
  try {
    await verifyFirebaseToken(req.headers.authorization);
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const uid = req.query.uid as string;
  if (!uid) {
    res.status(400).json({ error: 'Missing uid query parameter' });
    return;
  }

  try {
    await admin.auth().deleteUser(uid);
    await admin.firestore().collection('usuarios').doc(uid).delete();
    res.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
}
