// components/Layout.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import CartModal from './CartModal';

const Layout = ({ children, cartItems = [], removeFromCart }) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
      <Head>
        <title>Minha Loja</title>
        <meta name="description" content="Minha loja virtual de produtos artesanais" />
      </Head>
      <header>
        <nav>
          <div className="nav-links">
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
            <Link href="/loja" legacyBehavior>
              <a>Loja</a>
            </Link>
          </div>
          <button className="cart-button" onClick={() => setShowCart(true)}>
            🛒 Carrinho ({cartItems.length})
          </button>
        </nav>
      </header>
      <main>{children}</main>
      {showCart && (
        <CartModal
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          closeModal={() => setShowCart(false)}
        />
      )}
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .nav-links a {
          margin: 0 1rem;
          color: #333;
          text-decoration: none;
          font-weight: bold;
        }
        .cart-button {
          background: var(--primary-color);
          color: var(--dark-text-color);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .cart-button:hover {
          background: var(--hover-color);
        }
        main {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Layout;
