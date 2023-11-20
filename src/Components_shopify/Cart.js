// import React, { useEffect } from "react"
// import LineItem from "./LineItem"
// import { useShopify } from "../hooks"
// import Cart from "../Assets/Cart.svg"

// export default (props) => {
//   const { cartStatus, closeCart, openCart, checkoutState, setCount } =
//     useShopify()

//   function handleOpen(e) {
//     e.preventDefault()
//     openCart()
//   }

//   function handleClose(e) {
//     e.preventDefault()
//     closeCart()
//   }

//   function openCheckout(e) {
//     e.preventDefault()
//     // window.open(checkoutState.webUrl) // opens checkout in a new window
//     window.location.replace(checkoutState.webUrl) // opens checkout in same window
//   }

//   useEffect(() => {
//     const button = document.querySelector("button.App__view-cart")
//     if (cartStatus === true) {
//       button.classList.add("hide")
//     } else {
//       button.classList.remove("hide")
//     }

//     function getCount() {
//       let lineItems =
//         checkoutState.lineItems && checkoutState.lineItems.length > 0
//           ? checkoutState.lineItems
//           : []
//       let count = 0
//       lineItems.forEach((item) => {
//         count += item.quantity
//         return count
//       })

//       setCount(count)
//     }
//     getCount()
//   }, [cartStatus, checkoutState])

//   return (
//     <div id="cart">
//       <div className={`Cart ${cartStatus ? "Cart--open" : ""}`}>
//         <div className="App__view-cart-wrapper2">
//           <button
//             className="App__view-cart"
//             onClick={(e) => (cartStatus ? handleClose(e) : handleOpen(e))}
//           >
//             <h2 className="button-modal">Cart</h2>
//           </button>
//         </div>
//         <header className="Cart__header">
//           <h2>Your cart</h2>
//         </header>
//         <ul className="Cart__line-items">
//           <LineItem />
//         </ul>
//         <footer className="Cart__footer">
//           <div className="Cart-info clearfix">
//             <div className="Cart-info__total Cart-info__small">Subtotal</div>
//             <div className="Cart-info__pricing">
//               <span className="pricing">
//                 ${" "}
//                 {checkoutState.subtotalPrice &&
//                   checkoutState.subtotalPrice.amount}
//               </span>
//             </div>
//           </div>
//           <div className="Cart-info clearfix">
//             <div className="Cart-info__total Cart-info__small">Taxes</div>
//             <div className="Cart-info__pricing">
//               <span className="pricing">
//                 $ {checkoutState.subtotalPrice && checkoutState.totalTax.amount}
//               </span>
//             </div>
//           </div>
//           <div className="Cart-info clearfix">
//             <div className="Cart-info__total Cart-info__small">Total</div>
//             <div className="Cart-info__pricing">
//               <span className="pricing">
//                 ${" "}
//                 {checkoutState.subtotalPrice && checkoutState.totalPrice.amount}
//               </span>
//             </div>
//           </div>
//           <button
//             className="Cart__checkout button"
//             onClick={(e) => openCheckout(e)}
//           >
//             Checkout
//           </button>
//         </footer>
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react"
import { Container, Col, Row } from "react-bootstrap"
import LineItem from "./LineItem"
import { useShopify } from "../hooks"

// import CartIcon from '../Assets/ShoppingCart.svg';
// import Logo from "../Assets/logo.png"
// import Close from "../Assets/Close.svg"

export default function Cart() {
  const mobile = window.innerWidth < 600
  const { cartStatus, closeCart, checkoutState, setCount, openCart } =
    useShopify()

  function handleClose(e) {
    e.preventDefault()
    closeCart()
  }

  function openCheckout(e) {
    e.preventDefault()
    window.location.replace(checkoutState.webUrl)
  }

  useEffect(() => {
    function getCount() {
      let lineItems =
        checkoutState.lineItems && checkoutState.lineItems.length > 0
          ? checkoutState.lineItems
          : []
      let count = 0
      lineItems.forEach((item) => {
        count += item.quantity
        return count
      })
      setCount(count)
    }
    getCount()
  }, [cartStatus, checkoutState])
  console.log(checkoutState)

  return (
    <>
      {cartStatus && (
        <>
          <div className="new-cart-div">
            <button className="close-cart-text" onClick={(e) => handleClose(e)}>
              x
            </button>
            <div className="box-content">
              <h4 className="cart-text">Cart</h4>
              <div className="box-inside-design">
                <div className="content-box">
                  <LineItem />
                </div>
              </div>
              <div className="text-amount-cart">
                <h2 className="text-amount-size">Subtotal:</h2>
                <h2 className="text-amount-size" style={{ marginLeft: "auto" }}>
                  {checkoutState.subtotalPrice &&
                    checkoutState.subtotalPrice.currencyCode}
                  $
                  {checkoutState.subtotalPrice &&
                    checkoutState.subtotalPrice.amount}
                </h2>
              </div>
              <div className="text-amount-cart">
                <h2 className="text-amount-size">Taxes:</h2>
                <h2 className="text-amount-size" style={{ marginLeft: "auto" }}>
                  ${" "}
                  {checkoutState.subtotalPrice && checkoutState.totalTax.amount}
                </h2>
              </div>
              <div className="text-amount-cart">
                <h2 className="text-amount-size">Total:</h2>
                <h2 className="text-amount-size" style={{ marginLeft: "auto" }}>
                  {checkoutState.totalPrice &&
                    checkoutState.totalPrice.currencyCode}
                  ${checkoutState.totalPrice && checkoutState.totalPrice.amount}
                </h2>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <button
                  className="new-cart-checkout"
                  onClick={(e) => openCheckout(e)}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
          <div className="bg-cart" onClick={(e) => handleClose(e)}></div>
        </>
      )}
    </>
  )
}
