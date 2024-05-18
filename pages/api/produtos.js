// pages/api/produtos.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await stripe.products.list({
        active: true,
        limit: 10, // Ajuste o limite conforme necessário
      });

      const prices = await stripe.prices.list({
        limit: 10,
        expand: ['data.product'],
      });

      console.log("Produtos:", products.data);
      console.log("Preços:", prices.data);

      // Mapear preços aos produtos
      const productsWithPrices = products.data.map(product => {
        const price = prices.data.find(price => price.product === product.id);
        return {
          ...product,
          price: price ? price.unit_amount : null,
        };
      });

      console.log("Produtos com Preços:", productsWithPrices);

      res.status(200).json({ products: productsWithPrices });
    } catch (error) {
      console.error("Erro na API do Stripe:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
