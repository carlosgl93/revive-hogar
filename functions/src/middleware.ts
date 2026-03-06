import * as admin from 'firebase-admin';

export async function verifyFirebaseToken(authHeader: string | undefined): Promise<void> {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }
  const token = authHeader.split('Bearer ')[1];
  await admin.auth().verifyIdToken(token);
}
