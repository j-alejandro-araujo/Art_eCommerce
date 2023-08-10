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
import Paint from './pages/Paint';
import Canvas from './pages/Canvas';
import Brushes from './pages/Brushes';
import Drawing from './pages/Drawing';
import Sculpting from './pages/Sculpting';
import Pencils from './pages/Pencils';
import Framing from './pages/Framing';
import PrintMaking from './pages/PrintMaking';
import Fabric from './pages/Fabric';

function App() {
  const { user, token, isAuthorizing, handleSignin, handleSignout } = useAuth();
  const [cart, setCart] = useState([]);

  const updateCartItem = (productId, updatedQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, qty: updatedQty } : item
      )
    );
  };

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
  const cartContextValue = { cart, setCart, updateCartItem };

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
            <Route path="paint" element={<Paint />} />
            <Route path="canvas" element={<Canvas />} />
            <Route path="brushes" element={<Brushes />} />
            <Route path="drawing" element={<Drawing />} />
            <Route path="sculpting" element={<Sculpting />} />
            <Route path="pencils" element={<Pencils />} />
            <Route path="framing" element={<Framing />} />
            <Route path="printmaking" element={<PrintMaking />} />
            <Route path="fabric" element={<Fabric />} />
          </Route>
        </Routes>
      </CartContext.Provider>
    </GlobalContext.Provider>
  );
}

export default App;
