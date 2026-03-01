export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalized = phone.replace(/[\s+()-]/g, '').replace(/^0/, '56');
  const withCountry = normalized.startsWith('56') ? normalized : `56${normalized}`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}

export function buildPaymentReminderMessage(
  clientName: string,
  paykuSubscriptionUrl?: string,
): string {
  if (paykuSubscriptionUrl) {
    return `Hola ${clientName}! Te recordamos que tu pago de Revive Hogar esta pendiente. Puedes pagar aqui: ${paykuSubscriptionUrl}`;
  }
  return `Hola ${clientName}! Te recordamos que tu pago de Revive Hogar esta pendiente. Contactanos para configurar tu suscripcion.`;
}
