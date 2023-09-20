import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useShopify } from './hooks'

import Home from './Components/Home'
import Landing from './Components/Landing'
import ReturnPolicy from './Components/ReturnPolicy'

import './App.css'

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
    window.scrollTo(0, 1)
  }, [])

  return (
    <div id="App">
      <Routes>
        <Route exacta path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
      </Routes>
    </div>
  )
}

export default App
