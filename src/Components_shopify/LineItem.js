import React from 'react';
import { useShopify } from '../hooks';
import { Col, Row } from 'react-bootstrap';

export default function LineItem() {
  const { cartState, updateQuantity, removeLineItem } = useShopify();

  function deleteLineItem(lineItemId) {
    const cartId = cartState.id;
    removeLineItem(cartId, lineItemId);
  }

  return (
    <li className="Line-item">
      {cartState.lines && cartState.lines.edges &&
        cartState.lines.edges.map((edge, i) => {
          const lineItem = edge.node;
          return (
            <div key={lineItem.id} style={{ position: 'relative' }}>
              <div
                className="Line-item__remove-new"
                style={{ zIndex: 9 }}
                onClick={(e) => deleteLineItem(lineItem.id, e)}
              >
                x
              </div>
              <LineItemChild
                cartState={cartState}
                updateQuantity={updateQuantity}
                lineItem={lineItem}
              />
            </div>
          );
        })}
    </li>
  );
}

function LineItemChild({ cartState, updateQuantity, lineItem }) {
  const hideVariants = lineItem?.merchandise?.title === 'Default Title';
  function handleQuantity(lineItemId, quantity) {
    const cartId = cartState.id;
    const updatedQuantity = quantity;

    updateQuantity(lineItemId, updatedQuantity, cartId);
  }

  return (
    <Row style={{ borderBottom: '2px solid black' }}>
      <Col xs={{ span: 3 }}>
        {lineItem?.merchandise?.image ? (
          <img
            src={lineItem?.merchandise.image.url}
            alt={`${lineItem?.merchandise?.product?.title} product shot`}
            className="lineItem-image-new"
          />
        ) : null}
      </Col>
      <Col xs={4} style={{ padding: '5px' }}>
        <h3 className="lineitem-item-text">{lineItem?.merchandise?.product?.title}</h3>
        {!hideVariants && (
          <h3 className="lineitem-item-text">
            Size: {lineItem?.merchandise?.title}
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
          {(lineItem?.quantity * lineItem?.merchandise?.price?.amount).toFixed(2)}
        </h3>
      </Col>
    </Row>
  );
}
