import { useEffect, useState, useContext } from 'react';
import { fetchProduct, addToCart } from '../lib/api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CartContext from '../components/CartContext';
import GlobalContext from '../components/GlobalContext';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct(productId);
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {productId}: {error.message}
      </div>
    );
  }
  if (!product) return null;

  const { name, image, price, description } = product;

  async function handleAddToCart() {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    try {
      const qty = 1;
      const cartId = user.cartId;
      const addedProduct = await addToCart(productId, qty, cartId);
      const updatedCart = [...cart];
      updatedCart.push(addedProduct);
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mx-auto my-8">
      <Link to="/products" className="text-blue-600 hover:underline">
        Back to Products
      </Link>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row px-4 mt-4 md:gap-8">
        <div className="md:w-1/2">
          <img
            src={image}
            alt={name}
            className="w-full h-auto max-w-full max-h-full rounded-lg shadow-lg md:rounded-none md:shadow-none"
          />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-4">{name}</h2>
          <p className="text-lg">{description}</p>
          <p className="mt-2 text-lg font-bold">Price: ${price}</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;