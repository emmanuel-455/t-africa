// src/pages/ProductDetails/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams(); // Fetch the product ID from the URL params
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Replace with your actual API call
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more product details as needed */}
    </div>
  );
}

export default ProductDetails;
