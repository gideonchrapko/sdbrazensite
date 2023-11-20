import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useShopify } from "./hooks"

import Home from "./Components/Home"
import Landing from "./Components/Landing"
import ReturnPolicy from "./Components/ReturnPolicy"
import Footer from "./Components/Footer"

import "./App.css"

function App() {
  const { createShop, createCheckout, fetchProducts } = useShopify()

  useEffect(() => {
    createShop()
    fetchProducts()
    createCheckout()
    window.scrollTo(0, 1)
  }, [])

  return (
    <div id="App">
      <Routes>
        <Route exacta path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
