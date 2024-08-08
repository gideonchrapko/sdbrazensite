import React from "react"

import Footer from "./HeaderNew"
import Product from "../Components_shopify/Product"
import "../Styles/Home.css"

const Home = () => {
  return (
    <div style={{ overflow: "scroll" }}>
      <div>
        <Product />
      </div>
      <Footer />
    </div>
  )
}

export default Home
