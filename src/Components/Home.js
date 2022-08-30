import React from 'react'
import Nav from './Nav'
import Cart from '../Components_shopify/Cart'
import Product from '../Components_shopify/Product'
import Footer from '../Components/Footer'

import '../Styles/Home.css'

import Background from '../Assets/SDpixelpng.png'

const Home = () => {
    return (
        <div style={{ backgroundImage: `url(${Background})`, height: "100vh", width: "100%" }} className='home-container' >
            <Cart />
            <Nav /> 
			<Product /> 
            <Footer />
        </div>
    )
}

export default Home