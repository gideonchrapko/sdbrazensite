import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Info from '../Assets/Info.svg'

const Nav = () => {
    const [hover, setHover] = useState(false)
    const mobWidth = window.innerWidth < 600

    return (
        <div style={{ position: "fixed" , top: "0", zIndex: "98", width: "100vw" }}>
            {mobWidth ? 
                <div onClick={() => setHover(!hover)} >
                    <div style={{ opacity: `${hover ? "1" : "1" }` }} className='nav-div'>
                        <img src={Info} className={hover ? "info-hovered" : "info-nav"} />
                        <h1 className='nav-text' style={{ marginTop: "5px", opacity: `${hover ? "1" : "0"}` }}>CONTACT</h1>
                        <Link to="/home"><h1 className='nav-text' style={{ textDecoration: 'underline', opacity: `${hover ? "1" : "0"}`, color: "black" }}>STORE</h1></Link>
                    </div>
                </div>
                :
                <div onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
                    <div style={{ opacity: `${hover ? "1" : "1" }` }} className='nav-div'>
                        <img src={Info} className={hover ? "info-hovered" : "info-nav"} />
                        <h1 className='nav-text' style={{ marginTop: "5px", opacity: `${hover ? "1" : "0"}` }}>CONTACT</h1>
                        <Link to="/home"><h1 className='nav-text' style={{ textDecoration: 'underline', opacity: `${hover ? "1" : "0"}`, color: "black" }}>STORE</h1></Link>
                    </div>
                </div>            
            }
        </div>
    )
}

export default Nav