import React from 'react';
import Nav from '../Components/Nav';
import Cart from '../Components_shopify/Cart';
import Footer from '../Components/Footer';

import '../Styles/ReturnPolicy.css'

import Background from '../Assets/SDpixelpng.png'
import { Container, Row, Col } from 'react-bootstrap';

const ReturnPolicy = () => {
    return (
        <Container
            fluid
            style={{ backgroundImage: `url(${Background})`, height: "100vh", width: "100%" }} 
            className='home-container' 
        >   <Row style={{ paddingTop: "20vh" }}>
                <Col lg={{ offset: 2, span: 8 }}>
                    <h1 className='return-header'>Return Policy</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>

                    </h4>
                </Col>
            </Row>
            <Nav /> 
            <Cart />
            <Footer />
        </Container>
    )
}

export default ReturnPolicy