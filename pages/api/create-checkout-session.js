const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log('Request body:', req.body); // Logar o corpo da requisição
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map(item => ({
          price: item.price,
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'BR'], // Adicione os países permitidos
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 500, // Valor fixo de envio em centavos
                currency: 'brl', // Mudando para BRL
              },
              display_name: 'Envio padrão',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              },
            },
          },
        ],
      });
      console.log('Stripe session created:', session); // Logar a sessão criada
      res.status(200).json({ id: session.url });
    } catch (error) {
      console.error('Error creating Stripe session:', error); // Logar o erro
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
