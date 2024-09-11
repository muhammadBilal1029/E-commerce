import React from 'react';

const ProductCard = ({ product ,addToCart}) => {
  return (
    <div className="card ">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">Price: ${product.price}</p>
        <div className='card-btn'>
        <button className="btn btn-danger" onClick={() => addToCart(product)}>Add to Cart</button>
      
      
        </div>
      </div>
    </div>
  );
};

export default ProductCard;