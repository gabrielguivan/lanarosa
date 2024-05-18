// pages/api/pagar.js
const stripe = require('stripe')('sk_test_51PHqV207ggacgEGFaw0Ia1HkdAhAY0GESIynYZeChG82KBUx8S3DT7t66U0ia9enctPqMKt2DX7V2WF0L4lln80f00bBlh8z5d');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentMethodId } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Valor em centavos (ex: 1000 = $10.00)
        currency: 'brl',
        payment_method: paymentMethodId,
        confirm: true,
      });

      res.status(200).json({ paymentIntent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
