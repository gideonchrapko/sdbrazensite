import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './Components/Home'
import Landing from './Components/Landing'
import Products from './Components_shopify/Products'

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/home" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
