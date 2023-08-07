import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchCart } from './lib/api';
import GlobalContext from './components/GlobalContext';
import CartContext from './components/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AuthenticationPage from './pages/AuthenticationPage';
import { useAuth } from './useAuth';

function App() {
  const { user, token, isAuthorizing, handleSignin, handleSignout } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function loadCart(userId) {
      try {
        const cart = await fetchCart(userId);
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
    user && loadCart(user.userId);
  }, [user, setCart]);

  if (isAuthorizing) return null;

  const globalContextValue = { user, token, handleSignin, handleSignout };
  const cartContextValue = { cart, setCart };

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <CartContext.Provider value={cartContextValue}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Catalog />} />
            <Route path="details/:productId" element={<ProductDetails />} />
            <Route
              path="sign-in"
              element={<AuthenticationPage action="sign-in" />}
            />
            <Route
              path="sign-up"
              element={<AuthenticationPage action="sign-up" />}
            />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </CartContext.Provider>
    </GlobalContext.Provider>
  );
}

export default App;
