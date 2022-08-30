import React from 'react';
import Nav from '../Components/Nav';
import Cart from '../Components_shopify/Cart';
import Footer from '../Components/Footer';

import Background from '../Assets/SDpixelpng.png'

const ReturnPolicy = () => {
    return (
        <div
            style={{ backgroundImage: `url(${Background})`, height: "100vh", width: "100%" }} 
            className='home-container' 
        >
            <h1>Return Policy</h1>
            <Nav /> 
            <Cart />
            <Footer />
        </div>
    )
}

export default ReturnPolicy