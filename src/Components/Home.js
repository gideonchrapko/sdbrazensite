import React from 'react'
import { Container } from 'react-bootstrap'

import Nav from './Nav'
import Product from '../Components_shopify/Product'
import '../Styles/Home.css'

import Background from '../Assets/SDpixelpng.png'

const Home = () => {
    return (
        <Container 
            fluid 
            style={{ backgroundImage: `url(${Background})`, height: "100vh", width: "100vw" }} 
            className='home-container'
        >
            <Nav /> 
			<Product /> 
        </Container>
    )
}

export default Home