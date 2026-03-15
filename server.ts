import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Demo mode: bypass real M-Pesa, client handles Firestore unlock
const DEMO_MODE = process.env.DEMO_MODE === 'true';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // M-Pesa Daraja API Helpers
  const getMpesaToken = async () => {
    const key = process.env.MPESA_CONSUMER_KEY;
    const secret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Basic ${auth}` }
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting M-Pesa token:', error);
      throw error;
    }
  };

  // API Routes
  app.post('/api/mpesa/stkpush', async (req, res) => {
    const { phoneNumber, amount, assessmentId, userId } = req.body;

    // DEMO MODE: skip real M-Pesa, return instant success so client can unlock
    if (DEMO_MODE) {
      return res.json({
        ResponseCode: '0',
        ResponseDescription: 'Demo payment success',
        MerchantRequestID: 'DEMO-' + Date.now(),
        CheckoutRequestID: 'DEMO-' + Date.now()
      });
    }
    
    try {
      const token = await getMpesaToken();
      const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
      const password = Buffer.from(
        (process.env.MPESA_SHORTCODE || '174379') + 
        (process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919') + 
        timestamp
      ).toString('base64');

      const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const callbackUrl = `${process.env.APP_URL}/api/mpesa/callback`;

      const response = await axios.post(url, {
        BusinessShortCode: process.env.MPESA_SHORTCODE || '174379',
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_SHORTCODE || '174379',
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: "CareerPoint",
        TransactionDesc: `Assessment ${assessmentId}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      res.json(response.data);
    } catch (error: any) {
      console.error('M-Pesa STK Push Error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to initiate M-Pesa payment' });
    }
  });

  app.post('/api/mpesa/callback', async (req, res) => {
    console.log('M-Pesa Callback Received:', JSON.stringify(req.body, null, 2));
    // In a real app, you'd update Firestore here using Firebase Admin SDK
    // For this demo, we'll assume the client polls or we use a cloud function
    res.json({ ResultCode: 0, ResultDesc: "Success" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
