import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useShopify } from './hooks';

import Home from './Components/Home'
import Landing from './Components/Landing'
// import Products from './Components_shopify/Products'

import './App.css';

function App() {
	const {
		createShop,
		createCheckout,
		fetchProducts,
		// fetchCollection,
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
  	// fetchCollection()
    window.scrollTo( 0, 1 );
	}, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
