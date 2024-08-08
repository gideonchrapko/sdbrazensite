import { useState } from 'react'
import Lottie from 'react-lottie-player'
import { useNavigate } from 'react-router-dom';

import LottieAnim from '../Assets/stardogpng.json'

export default function Example() {
    const [hovered, setHovered] = useState(false)
    let navigate = useNavigate();
    const mobView = window.innerWidth < 600

  return (
    <Lottie
      loop
      animationData={LottieAnim}
      onClick={() => navigate('/home')}
      play
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{
        marginTop: mobView ? "20vh" : "5vh",
        height: mobView ? '60vh' : "90vh",
        cursor: 'pointer',
        filter: `${ hovered ? `invert(21%) sepia(88%) saturate(3469%) hue-rotate(305deg) brightness(97%) contrast(118%)` : ``}`,
        display: 'inline-block',
        }}
    />
  )
}