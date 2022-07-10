import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Nav from './Nav'
import Products from '../Components_shopify/Products'
import '../Styles/Home.css'

import Background from '../Assets/SDpixelpng.png'

const Home = () => {
    return (
        <Container fluid style={{ backgroundImage: `url(${Background})` }} className='home-container'>
            <Nav /> 
            <h1>Home</h1>
            <Products />
        </Container>
    )
}

export default Home