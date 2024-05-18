import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      try {
        const response = await axios.post('/api/payment', {
          paymentMethodId: paymentMethod.id,
        });
        console.log('Payment successful:', response);
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
      {error && <div>{error}</div>}
      <style jsx>{`
        .checkout-form {
          max-width: 400px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #eaeaea;
          border-radius: 4px;
          background: #f9f9f9;
        }
        button {
          background: #75633a;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        button:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        button:hover {
          background: #513939;
        }
        div {
          color: red;
          margin-top: 1rem;
        }
      `}</style>
    </form>
  );
};

const WrappedCheckoutForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default WrappedCheckoutForm;
