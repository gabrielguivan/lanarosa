import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, price, images } = req.body;

    try {
      // Verificar se as URLs das imagens são válidas
      const validImages = images.filter(image => image);

      // Criar o produto no Stripe
      const product = await stripe.products.create({
        name,
        description,
        images: validImages,
        metadata: {
          ...(validImages[1] && { image2: validImages[1] }),
          ...(validImages[2] && { image3: validImages[2] }),
          ...(validImages[3] && { image4: validImages[3] }),
        },
      });

      // Criar o preço do produto no Stripe
      const priceData = await stripe.prices.create({
        unit_amount: price,
        currency: 'brl',
        product: product.id,
      });

      res.status(200).json({ product, price: priceData });
    } catch (error) {
      console.error('Erro ao criar produto no Stripe:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
