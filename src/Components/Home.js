import React from 'react'
import { Container } from 'react-bootstrap'

import Nav from './Nav'
import Cart from '../Components_shopify/Cart'
import Product from '../Components_shopify/Product'
import '../Styles/Home.css'

import Background from '../Assets/SDpixelpng.png'

const Home = () => {
    return (
        <Container 
            fluid 
            style={{ backgroundImage: `url(${Background})`, height: "100vh", width: "100vw", backgroundColor: "red" }} 
            className='home-container'
        >
            <Cart />
            <Nav /> 
			<Product /> 
        </Container>
    )
}

export default Home