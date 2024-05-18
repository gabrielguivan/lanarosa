// pages/checkout.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/Layout';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Checkout = ({ cartItems = [], removeFromCart }) => {
  return (
    <Layout cartItems={cartItems} removeFromCart={removeFromCart}>
      <div className="checkout-container">
        <h1>Finalizar Compra</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <style jsx>{`
        .checkout-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background: #fff;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--primary-color);
        }
      `}</style>
    </Layout>
  );
};

export default Checkout;
