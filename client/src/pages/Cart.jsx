import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../components/GlobalContext';
import CartProduct from '../components/CartProduct';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../lib/api';

export default function Cart() {
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

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          {/* Display Cart Items */}
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {getCartQuantity(cart)} items</h5>
              </div>
              <div className="card-body">
                {cart?.map((product, index) => (
                  <React.Fragment key={product.productId}>
                    <CartProduct product={product} setCart={setCart} />
                    {index + 1 === cart.length ? undefined : (
                      <hr className="my-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Display Summary */}
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
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
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

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

  async function handleCheckout() {
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      };
      const res = await fetch('/api/checkout', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const body = await res.json();
      window.location.href = body.url;
    } catch (err) {
      console.error(err);
    }
  }
}
