import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../lib/api';
import Loader from '../components/Loader';

const ProductTypePage = ({ productType }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetchAllProducts();
        const filteredProducts = data.filter(
          (product) => product.type === productType
        );
        setProducts(filteredProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error);
      }
    }
    fetchProducts();
  }, [productType]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error Loading Products: {error.message}</div>;

  return (
    <div className="catalog-container">
      <h2 className="catalog-h2 flex justify-center uppercase text-4xl font-medium pt-5 pb-5 bg-[#FDB000] mt-10 mb-10">
        {productType} Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-center">
        {products.map((product) => (
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
                  <h3 className="font-bold mb-2 line-clamp-1">
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

export default ProductTypePage;
