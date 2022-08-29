import React from 'react'
// import { Container } from 'react-bootstrap'

import Nav from './Nav'
import Cart from '../Components_shopify/Cart'
import Product from '../Components_shopify/Product'
import '../Styles/Home.css'

import Background from '../Assets/SDpixelpng.png'

const Home = () => {
    return (
        <div 
            // style={{ backgroundImage: `url(${Background})`, height: "100vh", width: "100%", backgroundColor: "green" }} 
            // className='home-container'
        >
            <div style={{ width: "99vw", background: "red", position: "fixed", zIndex: "9999"}}>
                <Cart />
                Hello
            </div>
            <Nav /> 
			<Product /> 
        </div>
    )
}

export default Home