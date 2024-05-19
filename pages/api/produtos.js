// pages/api/produtos.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await stripe.products.list({ active: true, limit: 100 });
      const prices = await stripe.prices.list({ expand: ['data.product'] });

      const productsWithPrices = products.data.map(product => {
        const price = prices.data.find(price => price.product === product.id);
        return { ...product, price: price ? price.unit_amount : null };
      });

      res.status(200).json({ products: productsWithPrices });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: 'Error fetching products' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
