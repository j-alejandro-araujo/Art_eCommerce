import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../lib/api';
import { Link } from 'react-router-dom';

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetchAllProducts();
        console.log('Fetched products:', data);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="popular-products-container">
      <h2 className="text-2xl font-semibold mb-8 mt-6 flex justify-center">
        Browse Popular Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 justify-center">
        {products.slice(0, 8).map((product) => (
          <Link
            key={product.productId}
            to={`/details/${product.productId}`}
            style={{ textDecoration: 'none' }}>
            <div className="product-card bg-white p-4 rounded shadow hover:shadow-lg">
              <div className="mask">
                <img
                  src={product.image}
                  className="card-img-top img-contain"
                  alt={product.name}
                />
                <div className="product-info p-2">
                  <h3 className="font-bold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="badge bg-light pt-2 text-dark">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
