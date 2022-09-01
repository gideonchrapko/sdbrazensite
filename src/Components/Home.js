import React from 'react'
import Nav from './Nav'
import Cart from '../Components_shopify/Cart'
import Product from '../Components_shopify/Product'
import Footer from '../Components/Footer'

import { Container } from 'react-bootstrap'

import '../Styles/Home.css'

import Background from '../Assets/SDpixelpng.png'

const Home = () => {
    return (
        <Container fluid style={{ backgroundImage: `url(${Background})`, height: "100vh", width: "100%" }} className='home-container' >
            <Cart />
            <Nav /> 
			<Product /> 
            <Footer />
        </Container>
    )
}

export default Home