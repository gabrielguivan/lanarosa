// pages/loja.js
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/produtos`);
    const products = res.data;

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

const Loja = ({ products }) => {
  const addToCart = (product) => {
    // Logic to add product to cart
  };

  return (
    <div className="container">
      <h1>Loja</h1>
      <div className="product-gallery">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>R${(product.price / 100).toFixed(2)}</p>
                <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
      <style jsx>{`
        .container {
          padding: 2rem;
        }
        .product-gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .product-card {
          border: 1px solid #eaeaea;
          border-radius: 10px;
          padding: 1rem;
          width: calc(33.333% - 2rem);
        }
        .product-image {
          width: 100%;
          height: auto;
        }
        .product-info {
          text-align: center;
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

export default Loja;
