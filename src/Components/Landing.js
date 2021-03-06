import React from 'react'

import Lottie from '../Lottie/Lottie'

const Landing = () => {
    return (
        <div style={{ 
            width: '100vw', 
            textAlign: 'center',
            marginTop: window.innerWidth > 600 ? "3vh" : "25vh",
        }}>
            <Lottie />
        </div>
    )
}

export default Landing