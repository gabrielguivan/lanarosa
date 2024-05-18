// pages/loja.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const Loja = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/produtos');
        const data = await response.json();
        console.log('Produtos da API:', data.products);
        setProducts(data.products || []);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <Layout cartItems={cartItems} removeFromCart={removeFromCart}>
      <div className="store-container">
        <h1>Loja</h1>
        <div className="product-gallery">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.images[0]} alt={product.name} className="product-image" onClick={() => handleImageClick(product)} />
                <div className="product-info">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p className="product-price">R${(product.price / 100).toFixed(2)}</p>
                  <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedProduct.name}</h2>
            <div className="image-gallery">
              {selectedProduct.images.map((image, index) => (
                <img key={index} src={image} alt={`${selectedProduct.name} ${index + 1}`} className="gallery-image" />
              ))}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .store-container {
          padding: 2rem 0;
        }
        .product-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .product-card {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          cursor: pointer;
        }
        .product-info {
          padding: 1rem;
          text-align: center;
        }
        .product-info h2 {
          margin: 0.5rem 0;
          font-size: 1.25rem;
          color: var(--primary-color);
        }
        .product-info p {
          margin: 0.25rem 0;
          color: var(--text-color);
        }
        .product-price {
          font-weight: bold;
          color: var(--primary-color);
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
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: relative;
          max-width: 80%;
          max-height: 80%;
          overflow-y: auto;
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
        .image-gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .gallery-image {
          width: 100%;
          max-width: 200px;
          height: auto;
          border: 1px solid var(--border-color);
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default Loja;
