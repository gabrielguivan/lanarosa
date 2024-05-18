// pages/loja.js
import axios from 'axios';

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  try {
    const productsRes = await axios.get(`${baseUrl}/api/produtos`);
    const products = productsRes.data;

    return {
      props: { products },
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
              <img src={product.images[0]} alt={product.name} className="product-image" />
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
    </div>
  );
};

export default Loja;
