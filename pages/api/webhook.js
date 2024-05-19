// pages/api/webhook.js
import { buffer } from 'micro';
import Cors from 'micro-cors';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  const cors = Cors({ allowMethods: ['POST', 'HEAD'] });
  return cors(async (req, res) => {
    if (req.method === 'POST') {
      const buf = await buffer(req);
      const sig = req.headers['stripe-signature'];

      let event;

      try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        // Lógica para finalizar a compra
      }

      res.status(200).json({ received: true });
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  })(req, res);
};

export default webhookHandler;
