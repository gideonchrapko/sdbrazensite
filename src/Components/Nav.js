import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Cart from '../Components_shopify/Cart'
import Info from '../Assets/Info.svg'

const Nav = () => {
    const [hover, setHover] = useState(false)

    const mobWidth = window.innerWidth < 600

    return (
        <Container fluid style={{ position: "fixed" , top: "0", zIndex: "98" }}>
            {mobWidth ? 
                <div onClick={() => setHover(!hover)} >
                    <div style={{ opacity: `${hover ? "1" : "1" }` }} className='nav-div'>
                        <img src={Info} className={hover ? "info-hovered" : "info-nav"} />
                        <h1 className='nav-text' style={{ marginTop: "5px", opacity: `${hover ? "1" : "0"}` }}>CONTACT</h1>
                        <h1 className='nav-text' style={{ textDecoration: 'underline', opacity: `${hover ? "1" : "0"}` }}>STORE</h1>
                    </div>
                </div>
                :
                <div onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
                    <div style={{ opacity: `${hover ? "1" : "1" }` }} className='nav-div'>
                        <img src={Info} className={hover ? "info-hovered" : "info-nav"} />
                        <h1 className='nav-text' style={{ marginTop: "5px", opacity: `${hover ? "1" : "0"}` }}>CONTACT</h1>
                        <h1 className='nav-text' style={{ textDecoration: 'underline', opacity: `${hover ? "1" : "0"}` }}>STORE</h1>
                    </div>
                </div>            
            }
            <Cart />
        </Container>
    )
}

export default Nav