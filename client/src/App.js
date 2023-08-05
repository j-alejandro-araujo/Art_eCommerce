import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchCart } from './lib/api';
import GlobalContext from './components/GlobalContext';
import CartContext from './components/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AuthenticationPage from './pages/AuthenticationPage';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [cart, setCart] = useState([]);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const { user, token } = JSON.parse(auth);
      setUser(user);
      setToken(token);
    }
    setIsAuthorizing(false);
  }, []);

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
  }, [user]);

  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    const { user, token } = auth;
    setUser(user);
    setToken(token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
    navigate('/products');
  }

  if (isAuthorizing) return null;

  const globalContextValue = { user, token, handleSignIn, handleSignOut };
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
