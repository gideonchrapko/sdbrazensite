import React, { useState, useEffect } from "react"
import { useShopify } from "../hooks"
import sanityClient from "../client"

export default function LineItem() {
  const { checkoutState, updateQuantity, removeLineItem, products } =
    useShopify()
  const [singlePost, setSinglePost] = useState()

  function decrementQuantity(lineItemId, lineItemQuantity, e) {
    e.preventDefault()
    const checkoutId = checkoutState.id
    const updatedQuantity = lineItemQuantity - 1
    updateQuantity(lineItemId, updatedQuantity, checkoutId)
  }

  function incrementQuantity(lineItemId, lineItemQuantity, e) {
    e.preventDefault()
    const checkoutId = checkoutState.id
    const updatedQuantity = lineItemQuantity + 1
    updateQuantity(lineItemId, updatedQuantity, checkoutId)
  }

  function deleteLineItem(lineItemId, e) {
    e.preventDefault()
    const checkoutId = checkoutState.id
    removeLineItem(checkoutId, lineItemId)
  }

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "productImages"]{
			mainImage{
			asset->{
			  _id,
			  url
			},
			alt
		  },
		 }`
      )
      .then((data) => setSinglePost(data))
      .catch(console.error)
  }, [])

  return (
    <li className="Line-item">
      {checkoutState.lineItems &&
        checkoutState.lineItems.map((lineItem, i) => {
          return (
            <div style={{ display: "flex" }}>
              {" "}
              <button
                className="Line-item__remove-new"
                onClick={(e) => deleteLineItem(lineItem.id, e)}
              >
                x
              </button>
              {lineItem.variant.image ? (
                <img
                  src={lineItem.variant.image.src}
                  alt={`${lineItem.title} product shot`}
                  className="lineItem-image-new"
                />
              ) : null}
              <div style={{ padding: "10px" }}>
                <h1 className="Line-item__title-new">
                  Style: {lineItem.title}
                </h1>
                <h1 className="Line-item__title-new">
                  Size: {lineItem.variant.title}
                </h1>
                <div style={{ display: "flex" }}>
                  <span className="Line-item__title-new quant-text">
                    Quantity:
                  </span>
                  <div className="Line-item__content-row">
                    <div className="Line-item__quantity-container">
                      <button
                        className="Line-item__quantity-update"
                        onClick={(e) =>
                          decrementQuantity(lineItem.id, lineItem.quantity, e)
                        }
                      >
                        -
                      </button>
                      <span className="Line-item__quantity">
                        {lineItem.quantity}
                      </span>
                      <button
                        className="Line-item__quantity-update"
                        onClick={(e) => {
                          incrementQuantity(lineItem.id, lineItem.quantity, e)
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </li>
  )
}

// <div key={`${lineItem.title}` + i} className="lineItemDiv">
// <div className="Line-item__img">
//   {lineItem.variant.image ? (
//     <img
//       src={lineItem.variant.image.src}
//       alt={`${lineItem.title} product shot`}
//     />
//   ) : null}
// </div>
// <div className="Line-item__content">
//   <div className="Line-item__content-row">
//     <div className="Line-item__variant-title">
//       {lineItem.variant.title}
//     </div>
//     <div>
//       <h1 className="Line-item__title">{lineItem.title}</h1>
//     </div>
//   </div>
//   <div className="Line-item__content-row">
//     <div className="Line-item__quantity-container">
//       <button
//         className="Line-item__quantity-update"
//         onClick={(e) =>
//           decrementQuantity(lineItem.id, lineItem.quantity, e)
//         }
//       >
//         -
//       </button>
//       <span className="Line-item__quantity">
//         {lineItem.quantity}
//       </span>
//       <button
//         className="Line-item__quantity-update"
//         onClick={(e) => {
//           incrementQuantity(lineItem.id, lineItem.quantity, e)
//         }}
//       >
//         +
//       </button>
//     </div>
//     <span className="Line-item__price">
//       ${" "}
//     </span>
//   </div>
// </div>
// </div>
