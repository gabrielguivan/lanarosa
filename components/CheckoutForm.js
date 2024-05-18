// components/CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const response = await fetch('/api/pagar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      const paymentResult = await response.json();
      if (paymentResult.error) {
        setError(paymentResult.error);
      } else {
        console.log(paymentResult);
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label>Número do Cartão</label>
        <CardElement className="card-element" />
      </div>
      <button type="submit" disabled={!stripe || loading} className="submit-button">
        {loading ? 'Processando...' : 'Pagar'}
      </button>
      {error && <div className="error-message">{error}</div>}
      <style jsx>{`
        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .card-element {
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: #f9f9f9;
        }
        .submit-button {
          background: var(--primary-color);
          color: var(--dark-text-color);
          border: none;
          padding: 0.75rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .submit-button:hover {
          background: var(--hover-color);
        }
        .error-message {
          color: red;
          margin-top: 1rem;
        }
      `}</style>
    </form>
  );
};

export default CheckoutForm;
