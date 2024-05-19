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
      <CardElement className="card-element" />
      <button type="submit" disabled={!stripe} className="pay-button">
        Pagar
      </button>
      {error && <div className="error-message">{error}</div>}
      <style jsx>{`
        .checkout-form {
          max-width: 400px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .card-element {
          margin-bottom: 1rem;
          padding: 0.5rem;
          border: 1px solid #eaeaea;
          border-radius: 4px;
          background: #f9f9f9;
        }
        .pay-button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
          width: 100%;
          font-size: 1rem;
        }
        .pay-button:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        .pay-button:hover {
          background: var(--hover-color);
        }
        .error-message {
          color: red;
          margin-top: 1rem;
          text-align: center;
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
