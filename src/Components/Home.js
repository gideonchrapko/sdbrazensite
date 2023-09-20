// import React from 'react'
// import Nav from './Nav'
// import Product from '../Components_shopify/Product'
// import Footer from '../Components/Footer'

// import { Container } from 'react-bootstrap'

// import '../Styles/Home.css'

// import Background from '../Assets/SDpixelpng.png'

// const Home = () => {
//     return (
//         <Container
//             fluid
//             style={{
//                 backgroundImage: `url(${Background})`
//             }}
//             className='home-container'
//         >
//             <Nav />
// 			<Product />
//             <Footer />
//         </Container>
//     )
// }

// export default Home

import React from 'react'
import Nav from './Nav'
// import Cart from '../Components_shopify/Cart'
import Product from '../Components_shopify/Product'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'

// import { Container } from 'react-bootstrap'

import '../Styles/Home.css'

import bgImage from '../Assets/XGRAPHIC.png'
// import Background from '../Assets/SDpixelpng.png'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        verticalAlign: 'middle',
        positioon: 'relative',
        display: 'flex',
      }}
    >
      <img
        src={bgImage}
        style={{
          objectFit: 'contain',
          display: 'inline-block',
          marginLeft: 'auto',
          marginRight: 'auto',
          verticalAlign: 'middle',
        }}
        alt="background"
      />
      <button className="button-left but" onClick={() => navigate('/home')}>
        download
      </button>
      <button className="button-right but" onClick={() => navigate('/home')}>
        Stream
      </button>
      {/* <Footer /> */}
    </div>
  )
}

export default Home
