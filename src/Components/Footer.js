import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div style={{ bottom: "0", position: "fixed", width: "100vw", paddingBottom: "10px" }}>
            <h5 style={{ float: "left", paddingLeft: "30px" }}>Copyright © 2022, Stardog</h5>
            <Link to="/return-policy"><h5 style={{ float: "right", paddingRight: "30px", color: "black" }}>Return Policy</h5></Link>
        </div>
    )
}

export default Footer