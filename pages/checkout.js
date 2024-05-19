import { useContext, useState } from 'react';
import CartContext from '../context/CartContext';
import Image from 'next/image';
import WrappedCheckoutForm from '../components/CheckoutForm'; // Importar o formulário de checkout

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="checkout-details">
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="checkout-item">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  className="checkout-item-image"
                  width={80}
                  height={80}
                  layout="fixed"
                />
                <div className="checkout-item-info">
                  <h3>{item.name}</h3>
                  <p>R${(item.price / 100).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <p>Total: R${(cartItems.reduce((total, item) => total + item.price, 0) / 100).toFixed(2)}</p>
          </div>
          <WrappedCheckoutForm />
        </div>
      )}
      <style jsx>{`
        .checkout-container {
          padding: 20px;
          max-width: 800px;
          margin: auto;
          background: var(--background-color);
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: var(--primary-color);
          font-size: 2.5rem;
        }
        .checkout-details {
          margin-top: 20px;
          background: var(--light-background-color);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .checkout-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 8px;
          background: var(--light-gray-color);
        }
        .checkout-item-image {
          margin-right: 20px;
          border-radius: 8px;
        }
        .checkout-item-info {
          flex-grow: 1;
        }
        .checkout-item-info h3 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--dark-text-color);
        }
        .checkout-item-info p {
          margin: 5px 0 0;
          font-size: 1.2rem;
          color: var(--secondary-color);
        }
        .checkout-total {
          text-align: right;
          margin-top: 20px;
        }
        .checkout-total p {
          font-size: 1.5rem;
          color: var(--primary-color);
        }
        button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
          font-size: 1rem;
        }
        button:hover {
          background: var(--hover-color);
        }
        a {
          text-decoration: none;
        }
        @media (max-width: 600px) {
          .checkout-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .checkout-item-image {
            margin-right: 0;
            margin-bottom: 10px;
          }
          .checkout-item-info {
            text-align: left;
          }
          .checkout-total {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
