import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import LineItem from './LineItem';
import { useShopify } from '../hooks';

export default function Cart() {
  const { cartStatus, closeCart, cartState, setCount } = useShopify();

  function handleClose(e) {
    e.preventDefault();
    closeCart();
  }

  function openCheckout(e) {
    e.preventDefault();
    window.location.replace(cartState.checkoutUrl);
  }

  useEffect(() => {
    function getCount() {
      let lineItems =
        cartState.lines && cartState.lines.edges && cartState.lines.edges.length > 0
          ? cartState.lines.edges.map(edge => edge.node)
          : [];
      let count = 0;
      lineItems.forEach((item) => {
        count += item.quantity;
        return count;
      });
      setCount(count);
    }
    getCount();
  }, [cartStatus, cartState, setCount]);

  return (
    <>
      {cartStatus && (
        <>
          <div className="new-cart-div">
            <div className="close-cart-text" onClick={(e) => handleClose(e)}>
              x
            </div>
            <div
              style={{
                marginTop: '40px',
                borderBottom: 'solid 2px black',
                marginLeft: '5px',
                marginRight: '5px',
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
                    {cartState.cost?.totalAmount &&
                      cartState.cost.totalAmount.currencyCode}
                    $
                    {cartState.cost?.totalAmount &&
                      cartState.cost.totalAmount.amount}
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
