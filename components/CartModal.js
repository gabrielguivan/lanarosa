// components/CartModal.js
import React from 'react';
import Link from 'next/link';

const CartModal = ({ cartItems, removeFromCart, closeModal }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <button className="close-button" onClick={closeModal}>
          ×
        </button>
        <h2>Carrinho de Compras</h2>
        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>R${(item.price / 100).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(index)}>Remover</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <p>Total: R${(total / 100).toFixed(2)}</p>
              <Link href="/checkout" passHref>
                <button onClick={closeModal}>Finalizar Compra</button>
              </Link>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .cart-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cart-content {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: relative;
          width: 80%;
          max-width: 500px;
        }
        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .cart-item {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        .cart-item-image {
          width: 50px;
          height: 50px;
          object-fit: cover;
          margin-right: 1rem;
        }
        .cart-total {
          text-align: right;
          margin-top: 1rem;
        }
        button {
          background: var(--primary-color);
          color: var(--dark-text-color);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        button:hover {
          background: var(--hover-color);
        }
      `}</style>
    </div>
  );
};

export default CartModal;
