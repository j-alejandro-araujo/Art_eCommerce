import React, { useState, useEffect } from 'react';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/product/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product Catalog</h2>
      {products.map((product) => (
        <div key={product.productId}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
          <img src={product.image} alt={product.name} />
        </div>
      ))}
    </div>
  );
};

export default ProductCatalog;
