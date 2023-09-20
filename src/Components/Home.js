import React from 'react'
import { useScramble } from 'use-scramble'

import '../Styles/Home.css'

import bgImage from '../Assets/XGRAPHIC.png'
// import Background from '../Assets/SDpixelpng.png'
const Scramble = ({ text, link, name }) => {
  const { ref, replay } = useScramble({
    text: text,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  })
  return (
    <a href={link} className={name} ref={ref} onPointerOver={replay}>
      1
    </a>
  )
}

const Home = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        verticalAlign: 'middle',
        positioon: 'relative',
        display: 'flex',
        position: 'fixed',
        minHeight: '100vh',
        /* mobile viewport bug fix */
        minHeight: '-webkit-fill-available',
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
      <Scramble
        text="Stream"
        link="https://www.youtube.com/"
        name="button-right but"
      />
      <Scramble
        text="Download"
        link="https://www.youtube.com/"
        name="button-left but"
      />
    </div>
  )
}

export default Home
