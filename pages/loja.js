// pages/loja.js
import axios from 'axios';
import Image from 'next/image';

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  try {
    const productsRes = await axios.get(`${baseUrl}/api/produtos`);
    const products = productsRes.data.products;

    // If you have a separate endpoint for prices, fetch them and match with products
    // Assuming you have a similar endpoint for prices
    const pricesRes = await axios.get(`${baseUrl}/api/precos`);
    const prices = pricesRes.data;

    const productsWithPrices = products.map(product => {
      const productPrice = prices.find(price => price.product.id === product.id);
      return {
        ...product,
        price: productPrice ? productPrice.unit_amount : null
      };
    });

    return {
      props: { products: productsWithPrices },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: { products: [] },
    };
  }
}

const Loja = ({ products }) => {
  return (
    <div>
      <h1>Loja</h1>
      <div className="product-gallery">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <Image src={product.images[0]} alt={product.name} className="product-image" width={200} height={200} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>R${(product.price / 100).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
      <style jsx>{`
        .product-gallery {
          display: flex;
          flex-wrap: wrap;
        }
        .product-card {
          margin: 10px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .product-image {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default Loja;
