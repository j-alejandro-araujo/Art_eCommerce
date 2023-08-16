import React, { useContext, useEffect, useCallback } from 'react';
import GlobalContext from '../components/GlobalContext';
import CartProduct from '../components/CartProduct';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../lib/api';
import CartContext from '../components/CartContext';

const Cart = () => {
  const { user, token } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    !user && navigate('/sign-in');
    async function loadCart(cartId) {
      try {
        const cart = await fetchCart(cartId);
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
    user && loadCart(user.userId);
  }, [user, navigate, setCart]);

  const handleCheckout = useCallback(async () => {
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      };
      const res = await fetch('/api/checkout', req);

      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }

      setCart([]);
      const body = await res.json();
      window.location.href = body.url;
    } catch (err) {
      console.error(err);
    }
  }, [cart, setCart, token]);

  return (
    <div className="h-100 gradient-custom w-full">
      <div className="container py-5">
        <div className="flex justify-center my-4 flex-col lg:flex-row">
          {/* Display Cart Items */}
          <div className="w-full lg:w-3/4 mb-4 lg:mb-0">
            <div className="bg-white shadow-md rounded-md p-4 ml-8">
              <h3 className="text-xl font-semibold mb-4">
                Cart ({getCartQty(cart)} items)
              </h3>
              <ul className="divide-y divide-gray-300">
                {cart?.map((product) => (
                  <li key={product.cartItemId} className="py-4">
                    <CartProduct product={product} />
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
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total Amount</strong>
                  </div>
                  <span>
                    <strong>{getCartTotal(cart)}</strong>
                  </span>
                </li>
              </ul>
              <button
                className="bg-[#2BA3C6] hover:bg-[#1b81a0] text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleCheckout}>
                Checkout
              </button>
              <div className="bg-gray-100 rounded-md p-4 mb-4 mt-8">
                <h4 className="text-sm font-semibold mb-2">
                  Test Credit Card Information:
                </h4>
                <p>Email: test@email.com</p>
                <p>Card Number: 4242 4242 4242 4242</p>
                <p>Exp: 4/24</p>
                <p>CVC: 424</p>
                <p>Name: test</p>
                <p>Zip Code: 42424</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export function getCartQty(cart) {
  let quantity = 0;
  cart?.forEach((item) => {
    quantity += Number(item.qty);
  });
  return quantity;
}

export function getCartTotal(cart) {
  let total = 0;
  cart?.forEach((item) => {
    total += item.price * item.qty;
  });
  return `$${total.toFixed(2)}`;
}
