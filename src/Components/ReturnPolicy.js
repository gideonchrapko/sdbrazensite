import React, { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import sanityClient from '../client';

import Nav from '../Components/Nav';
import Cart from '../Components_shopify/Cart';
import Footer from '../Components/Footer';

import '../Styles/ReturnPolicy.css'

import Background from '../Assets/SDpixelpng.png'
import { Container, Row, Col } from 'react-bootstrap';

const ReturnPolicy = () => {
    const [policyText, setPolicyText] = useState()

    useEffect(() => {
        sanityClient.fetch(`*[_type == "returnPolicy"]{
            returnCopy
        }`)
        .then((data) => setPolicyText(data))
        .catch(console.error)
    },[])

    console.log(policyText)

    return (
        <Container
            fluid
            style={{ backgroundImage: `url(${Background})`, height: "100vh", width: "100%" }} 
            className='home-container' 
        >   <Row style={{ paddingTop: "20vh" }}>
                <Col lg={{ offset: 2, span: 8 }} xs={{ offset: 2, span: 8 }}>
                    <h1 className='return-header'>Return Policy</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={{ offset: 2, span: 8 }} xs={{ offset: 2, span: 8 }}>
                    <h4 className='return-copy'>
                        <BlockContent 
                            blocks={policyText && policyText[0].returnCopy}
                            projectId="ly1o9qot"
                            dataset="production"
                         />
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