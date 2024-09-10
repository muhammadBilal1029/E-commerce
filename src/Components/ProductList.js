import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({addToCart}) => {
   
  const products=[
    {
        "id": 1,
        "name": "Ultra Smart Watch",
        "description": "Redefine style and functionality with advanced wrist technology",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGY7fkRTM0pIqVYA5qygvDSJbshjntX0dcug&s",
        "price": 19.99
      },
      {
        "id": 2,
        "name": "AirPods",
        "description": "Wireless freedom with exceptional sound quality and seamless connectivity.",
        "image": "https://gadgetguy-assets.s3.ap-southeast-2.amazonaws.com/wordpress/wp-content/uploads/2022/09/08104637/Apple-AirPods-Pro-2nd-gen-hero-220907-1155x770.jpg",
        "price": 19.99
      },
      {
        "id": 3,
        "name": "Shoes",
        "description": "Step into comfort and style with versatile footwear crafted to elevate your look with every stride",
        "image": "https://m.media-amazon.com/images/I/61vxTNNKUOL._AC_UY1000_.jpg",
        "price": 19.99
      },
      {
        "id": 4,
        "name": "Shirt",
        "description": "Elevate your wardrobe with our stylish shirts, crafted for comfort and sophistication.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSKt4W9kui6wJ23SgvOOc1cfx981d19I3VPQ&s",
        "price": 19.99
      },
      {
        "id": 5,
        "name": "Sofa Cover",
        "description": "Revitalize your sofa with our stylish, durable cover, protecting and enhancing your furniture.",
        "image": "https://shoprolls.pk/wp-content/uploads/2023/07/Sofa-Cover-Black-Pattern.jpg",
        "price": 19.99
      },
      {
        "id": 6,
        "name": "Blender Machine",
        "description": "Blend effortlessly with our powerful, versatile blender machine, perfect for smoothies, soups.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcaVNtRXprwgCCOxmW2Rd12wTdEbZGxAvHg&s",
        "price": 19.99
      },

  ]

  return (
    <div>
      <h2 style={{textAlign:'center' ,marginTop:'80px'}}>Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 px-4" key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;