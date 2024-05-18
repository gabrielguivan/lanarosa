// components/Cart.js
import React from 'react';
import Link from 'next/link';

const Cart = ({ cartItems, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
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
              <button>Finalizar Compra</button>
            </Link>
          </div>
        </>
      )}
      <style jsx>{`
        .cart {
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

export default Cart;