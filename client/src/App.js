import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
// import GlobalContext from './components/GlobalContext';
import CartContext from './components/CartContext';

function App() {
  // const [serverData, setServerData] = useState('');

  // useEffect(() => {
  //   async function readServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     setServerData(data.message);
  //   }

  //   readServerData();
  // }, []);
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Catalog />} />
          <Route path="details/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
