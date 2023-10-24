import React from "react"
import { useScramble } from "use-scramble"

import bgImage from "../Assets/XGRAPHIC.png"
import Poster from "../Assets/Poster1.png"
import Footer from "../Components/FooterNew"

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
    <div style={{ overflow: "scroll" }}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          verticalAlign: "middle",
          positioon: "relative",
          display: "flex",
          position: "relative",
          minHeight: "100vh",
          minHeight: "-webkit-fill-available",
        }}
      >
        <img
          className="transform-mobile"
          src={Poster}
          style={{
            objectFit: "contain",
            display: "inline-block",
            marginLeft: "auto",
            marginRight: "auto",
            position: "absolute",
            width: "100%",
            cursor: "pointer",
          }}
          alt="background"
        />
        <div className="centered-text transform-mobile">
          <a
            href="https://ra.co/events/1794868"
            style={{
              zIndex: "10",
              color: "red",
              fontFamily: "impact",
              fontSize: "18vw",
            }}
          >
            <h1
              style={{
                transform: "rotate(-20deg)",
              }}
              className="tickets-font"
            >
              TICKETS
            </h1>
          </a>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          verticalAlign: "middle",
          position: "relative",
          display: "flex",
          minHeight: "100vh",
          minHeight: "-webkit-fill-available",
        }}
      >
        <img
          src={bgImage}
          style={{
            objectFit: "contain",
            display: "inline-block",
            marginLeft: "auto",
            marginRight: "auto",
            position: "absolute",
            width: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          alt="background"
        />
        <Scramble
          text="Stream"
          link="https://soundcloud.com/loukeman/sdx-megamix?si=0f32721e3eb64643b4b934bf624e7074&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
          name="button-right but"
        />
        <Scramble
          text="Download"
          link="https://loukeman.bandcamp.com/track/sdx-megamix"
          name="button-left but"
        />
      </div>
      <Footer />
    </div>
  )
}

export default Home
