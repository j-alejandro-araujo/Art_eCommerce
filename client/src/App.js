import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './components/Catalog';

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

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Catalog />} />
      </Route>
    </Routes>
  );
}

export default App;
