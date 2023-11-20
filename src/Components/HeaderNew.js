import { useCallback, useState } from "react"
import MailchimpForm from "./Signup/MailchimpForm"
import Cart from "../Components_shopify/Cart"
import { useShopify } from "../hooks"

import Image from "../Assets/LLB.png"

const Modal = ({ modalClose }) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          border: "1px solid black",
          background: "white",
          padding: "25px",
          zIndex: 999999999,
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
        <p className="text-bottom-modal">
          ALL SALES FINAL PLEASE DOUBLE CHECK YOUR SIZE AND ADDRESS. Thank you
          &lt;3
        </p>
      </div>
      <div className="bg-cart" onClick={modalClose}></div>
    </>
  )
}

export default function Footer() {
  const { openCart } = useShopify()
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
      <div style={{ position: "fixed", top: 0, left: 0, padding: "10px" }}>
        <button onClick={modalOpen} className="button-modal">
          Info
        </button>
      </div>
      <div style={{ position: "fixed", top: 0, right: 0, padding: "10px" }}>
        <button onClick={openCart} className="button-modal">
          Cart
        </button>
      </div>
      <Cart />
    </>
  )
}
