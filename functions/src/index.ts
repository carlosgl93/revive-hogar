import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import { onRequest } from 'firebase-functions/v2/https';

import {
  listPaykuSubscriptions,
  getPaykuSubscriptionStatus,
  listPaykuClients,
  getPaykuClient,
  createPaykuClientFn,
  updatePaykuClient,
  deletePaykuClient,
  listPaykuSubscriptionsV3,
  createPaykuSubscription,
  getPaykuSubscription,
  deletePaykuSubscription,
  affiliatePaykuCard,
  createPaykuTransactionForClient,
  syncHistoricPayments,
} from './payku/handlers';

import {
  webhookSubscriptionActivation,
  webhookPaymentCharge,
} from './payku/webhooks';

import { importFromSheets } from './sheets/handlers';
import { createUsuario, deleteUsuario } from './users/handlers';
import { syncCurrentYear } from './payku/scheduled';
import { sendPaymentReminder } from './notifications/paymentReminder';

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// Payku client endpoints
app.get('/api/listPaykuClients', listPaykuClients);
app.get('/api/getPaykuClient', getPaykuClient);
app.post('/api/createPaykuClientFn', createPaykuClientFn);
app.put('/api/updatePaykuClient', updatePaykuClient);
app.delete('/api/deletePaykuClient', deletePaykuClient);

// Payku subscription endpoints
app.get('/api/listPaykuSubscriptions', listPaykuSubscriptions);
app.get('/api/getPaykuSubscriptionStatus', getPaykuSubscriptionStatus);
app.get('/api/listPaykuSubscriptionsV3', listPaykuSubscriptionsV3);
app.post('/api/createPaykuSubscription', createPaykuSubscription);
app.get('/api/getPaykuSubscription', getPaykuSubscription);
app.delete('/api/deletePaykuSubscription', deletePaykuSubscription);

// Payku card endpoint
app.post('/api/affiliatePaykuCard', affiliatePaykuCard);

// Payku transaction endpoints
app.post('/api/createPaykuTransactionForClient', createPaykuTransactionForClient);
app.post('/api/syncHistoricPayments', syncHistoricPayments);

// Payku webhooks (no auth - called by Payku servers)
app.post('/api/webhookSubscriptionActivation', webhookSubscriptionActivation);
app.post('/api/webhookPaymentCharge', webhookPaymentCharge);

// Sheets import
app.all('/api/importFromSheets', importFromSheets);

// User management
app.post('/api/createUsuario', createUsuario);
app.delete('/api/deleteUsuario', deleteUsuario);

// Converted scheduled functions (trigger manually via POST)
app.post('/api/scheduledSyncCurrentYear', syncCurrentYear);
app.post('/api/scheduledPaymentReminder', sendPaymentReminder);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export const api = onRequest(
  {
    region: 'us-central1',
    memory: '256MiB',
    minInstances: 0,
    maxInstances: 10,
    timeoutSeconds: 540,
  },
  app,
);
