import { useCallback, useState } from "react"
import MailchimpForm from "./Signup/MailchimpForm"

import Image from "../Assets/LLB.png"

const Modal = ({ modalClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        border: "1px solid black",
        background: "white",
        padding: "25px",
      }}
      className="model-size"
    >
      <button
        onClick={modalClose}
        className="button-modal"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "black",
        }}
      >
        x
      </button>
      <img
        src={Image}
        alt="Live Life Brxzxnly"
        style={{ height: "50%", width: "auto", paddingLeft: "30px" }}
      />
      <p className="text-modal">
        Sd music group is an
        <br /> independent music
        <br /> label based in
        <br /> Toronto.
      </p>
      <p className="text-modal">info@sdmusicgroup.com</p>
      <MailchimpForm />
      <div className="text-modal">
        <a href="https://discord.gg/tQVkEHtP" style={{ color: "black" }}>
          Discord: https://discord.gg/tQVkEHtP
        </a>
      </div>
    </div>
  )
}

export default function Footer() {
  const [viewModal, setViewModal] = useState(false)
  const modalOpen = useCallback(() => {
    setViewModal(true)
  }, [])
  const modalClose = useCallback(() => {
    setViewModal(false)
  }, [])
  return (
    <>
      {viewModal && <Modal modalClose={modalClose} />}
      <div style={{ position: "fixed", bottom: 0, left: 0, padding: "10px" }}>
        <button onClick={modalOpen} className="button-modal">
          Info
        </button>
      </div>
    </>
  )
}
