import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Cart from '../Components_shopify/Cart'

const Nav = () => {
    return (
        <Container fluid style={{ display: "inline-flex" }}>
            <h1>Store</h1>
            <h1 style={{ cursor: "pointer" }}>Contact</h1>
            <Cart />
        </Container>
    )
}

export default Nav