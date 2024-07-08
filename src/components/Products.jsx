import React from 'react';

const Product = ({ id, title, price, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart({ id, title, price });
  };

  return (
    <div>
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
};

export default Product;