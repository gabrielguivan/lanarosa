import Image from 'next/image';

const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          {item.image && (
            <Image 
              src={item.image} 
              alt={item.name} 
              width={50} 
              height={50} 
              className="cart-item-image" 
            />
          )}
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>R$ {(item.price / 100).toFixed(2)}</p>
          </div>
        </div>
      ))}
      <style jsx>{`
        .cart-item {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        .cart-item-image {
          margin-right: 1rem;
        }
        .cart-item-info {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default Cart;
