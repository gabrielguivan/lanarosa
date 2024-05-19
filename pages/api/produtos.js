import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const products = await stripe.products.list({ limit: 100 });

    // Obter preços associados aos produtos
    const prices = await stripe.prices.list({ limit: 100 });

    const productsWithPrices = products.data.map(product => {
      const productPrice = prices.data.find(price => price.product === product.id);
      return {
        ...product,
        price_id: productPrice?.id,
        price: productPrice?.unit_amount,
      };
    });

    res.status(200).json({ products: productsWithPrices });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};
