import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import LineItem from './LineItem';
import { useShopify } from '../hooks';

// import CartIcon from '../Assets/ShoppingCart.svg';
// import Logo from "../Assets/logo.png"
// import Close from "../Assets/Close.svg"

export default function Cart() {
  const mobile = window.innerWidth < 600;
  const { cartStatus, closeCart, checkoutState, setCount, openCart } =
    useShopify();

  function handleClose(e) {
    e.preventDefault();
    closeCart();
  }

  function openCheckout(e) {
    e.preventDefault();
    window.location.replace(checkoutState.webUrl);
  }

  useEffect(() => {
    function getCount() {
      let lineItems =
        checkoutState.lineItems && checkoutState.lineItems.length > 0
          ? checkoutState.lineItems
          : [];
      let count = 0;
      lineItems.forEach((item) => {
        count += item.quantity;
        return count;
      });
      setCount(count);
    }
    getCount();
  }, [cartStatus, checkoutState]);

  return (
    <>
      {cartStatus && (
        <>
          <div className="new-cart-div" style={{ padding: '10px' }}>
            <button className="close-cart-text" onClick={(e) => handleClose(e)}>
              x
            </button>
            <div
              style={{
                marginTop: '40px',
                borderBottom: 'solid 2px black',
              }}
            >
              <Row>
                <Col xs={{ offset: 3, span: 4 }}>
                  <h3 className="lineitem-item-text">Item</h3>
                </Col>
                <Col xs={{ span: 3 }}>
                  <h3 className="lineitem-item-text">Quantity</h3>
                </Col>
                <Col xs={{ span: 2 }} style={{ textAlign: 'right' }}>
                  <h3 className="lineitem-item-text">Total</h3>
                </Col>
              </Row>
            </div>
            <div
              style={{
                height: 'calc(100% - 130px)',
                overflow: 'scroll',
                borderBottom: 'solid 2px black',
              }}
            >
              <LineItem />
            </div>
            <div style={{ padding: '5px' }}>
              <Row>
                <Col>
                  <h3 className="lineitem-item-text">Subtotal</h3>
                </Col>
                <Col>
                  <h3
                    style={{ textAlign: 'right' }}
                    className="lineitem-item-text"
                  >
                    {checkoutState.totalPrice &&
                      checkoutState.totalPrice.currencyCode}
                    $
                    {checkoutState.totalPrice &&
                      checkoutState.totalPrice.amount}
                    0
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button
                    style={{
                      background: 'black',
                      border: 'none',
                      color: 'white',
                      width: '100%',
                    }}
                    onClick={(e) => openCheckout(e)}
                  >
                    <h3>Checkout</h3>
                  </button>
                </Col>
              </Row>
            </div>
          </div>
          <div className="bg-cart" onClick={(e) => handleClose(e)}></div>
        </>
      )}
    </>
  );
}
