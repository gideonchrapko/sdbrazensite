import React from 'react';
import { useShopify } from '../hooks';
import { Col, Row } from 'react-bootstrap';

export default function LineItem() {
  const { checkoutState, updateQuantity, removeLineItem } = useShopify();

  function deleteLineItem(lineItemId) {
    const checkoutId = checkoutState.id;
    removeLineItem(checkoutId, lineItemId);
  }

  return (
    <li className="Line-item">
      {checkoutState.lineItems &&
        checkoutState.lineItems.map((lineItem, i) => {
          return (
            <div style={{ position: 'relative' }}>
              <div
                className="Line-item__remove-new"
                style={{ zIndex: 9 }}
                onClick={(e) => deleteLineItem(lineItem.id, e)}
              >
                x
              </div>
              <LineItemChild
                checkoutState={checkoutState}
                updateQuantity={updateQuantity}
                lineItem={lineItem}
              />
            </div>
          );
        })}
    </li>
  );
}

function LineItemChild({ checkoutState, updateQuantity, lineItem }) {
  const hideVariants = lineItem?.variant?.title === 'Default Title';
  function handleQuantity(lineItemId, quantity) {
    const checkoutId = checkoutState.id;
    const updatedQuantity = quantity;

    updateQuantity(lineItemId, updatedQuantity, checkoutId);
  }

  return (
    <Row style={{ borderBottom: '2px solid black' }}>
      <Col xs={{ span: 3 }}>
        {lineItem?.variant?.image ? (
          <img
            src={lineItem?.variant.image.src}
            alt={`${lineItem?.title} product shot`}
            className="lineItem-image-new"
          />
        ) : null}
      </Col>
      <Col xs={4} style={{ padding: '5px' }}>
        <h3 className="lineitem-item-text">{lineItem?.title}</h3>
        {!hideVariants && (
          <h3 className="lineitem-item-text">
            Size: {lineItem?.variant?.title}
          </h3>
        )}
      </Col>
      <Col xs={2} style={{ paddingTop: '5px' }}>
        <select
          value={lineItem?.quantity}
          onChange={(e) => handleQuantity(lineItem?.id, Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option
              key={n}
              value={`${n}`}
              onClick={(e) => handleQuantity(lineItem?.id, n, e)}
            >
              {n}
            </option>
          ))}
        </select>
      </Col>
      <Col
        xs={{ span: 3 }}
        style={{
          paddingTop: '5px',
          textAlign: 'right',
        }}
      >
        <h3 className="lineitem-item-text">
          $USD{' '}
          {(lineItem?.quantity * lineItem?.variant?.price?.amount).toFixed(2)}
        </h3>
      </Col>
    </Row>
  );
}
