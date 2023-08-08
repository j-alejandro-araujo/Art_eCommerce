import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../components/GlobalContext';
import CartProduct from '../components/CartProduct';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../lib/api';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/sign-in');
    async function loadCart(userId) {
      try {
        const cart = await fetchCart(userId);
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
    user && loadCart(user.userId);
  }, [user, navigate]);

  function getCartQuantity(cart) {
    let quantity = 0;
    cart?.forEach((item) => {
      quantity += item.qty;
    });
    return quantity;
  }

  function getCartTotal(cart) {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.qty;
    });
    return `$${total.toFixed(2)}`;
  }

  return (
    <div className="h-100 gradient-custom w-full">
      <div className="container py-5">
        <div className="flex justify-center my-4 flex-col lg:flex-row">
          {/* Display Cart Items */}
          <div className="w-full lg:w-3/4 mb-4 lg:mb-0">
            <div className="bg-white shadow-md rounded-md p-4 ml-8">
              <h3 className="text-xl font-semibold mb-4">
                Cart ({getCartQuantity(cart)} items)
              </h3>
              <ul className="divide-y divide-gray-300">
                {cart?.map((product) => (
                  <li key={product.productId} className="py-4">
                    <CartProduct product={product} setCart={setCart} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Display Summary */}
          <div className="w-full lg:w-1/3 ml-4">
            <div className="bg-white shadow-md rounded-md p-4 ml-4 mr-4 mt-4 lg:mt-0">
              <h3 className="text-xl font-semibold mb-4">Summary</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Subtotal
                  <span>{getCartTotal(cart)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span>
                    <strong>{getCartTotal(cart)}</strong>
                  </span>
                </li>
              </ul>
              <button className="bg-[#2BA3C6] hover:bg-[#1b81a0] text-white font-bold py-2 px-4 rounded w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
