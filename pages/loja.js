import axios from 'axios';
import { useContext, useState } from 'react';
import Image from 'next/image';
import CartContext from '../context/CartContext';
import CartModal from '../components/CartModal';

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/produtos`);
    return { props: { products: data.products } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] } };
  }
}

const Loja = ({ products }) => {
  const { addToCart, cartItemCount } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const handleNextImage = (productId) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [productId]: (prevState[productId] + 1) % products.find(p => p.id === productId).images.length
    }));
  };

  const handlePrevImage = (productId) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [productId]: (prevState[productId] - 1 + products.find(p => p.id === productId).images.length) % products.find(p => p.id === productId).images.length
    }));
  };

  return (
    <div className="loja-container">
      <h1>Loja</h1>
      <button className="open-cart-button" onClick={openCart}>
        Carrinho ({cartItemCount})
      </button>
      <div className="product-gallery">
        {products.length ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="carousel">
                <Image
                  src={product.images[currentImageIndex[product.id] || 0]}
                  alt={product.name}
                  className="product-image"
                  width={300}
                  height={200}
                  layout="responsive"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      className="carousel-button prev"
                      onClick={() => handlePrevImage(product.id)}
                    >
                      ‹
                    </button>
                    <button
                      className="carousel-button next"
                      onClick={() => handleNextImage(product.id)}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price ? `R$${(product.price / 100).toFixed(2)}` : 'Preço não disponível'}</p>
                <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
      {isCartOpen && <CartModal closeModal={closeCart} />}
      <style jsx>{`
        .loja-container {
          padding: 20px;
        }
        .product-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .product-card {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          background: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .carousel {
          position: relative;
        }
        .product-image {
          border-radius: 10px;
        }
        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
        }
        .carousel-button.prev {
          left: 10px;
        }
        .carousel-button.next {
          right: 10px;
        }
        .product-info {
          margin-top: 10px;
        }
        .open-cart-button {
          position: fixed;
          top: 20px;
          right: 20px;
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .open-cart-button:hover {
          background: var(--hover-color);
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
