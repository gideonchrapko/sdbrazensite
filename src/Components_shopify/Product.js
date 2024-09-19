import React, { useEffect, useState } from 'react';
import { useShopify } from '../hooks';
import { Row, Col, Container } from 'react-bootstrap';

import { useParams } from 'react-router-dom';
// import SizeVariant from './SizeVariants';

export default function Product() {
  const { product, fetchProduct, openCart, checkoutState, addVariant } =
    useShopify();

  const { productHandle } = useParams();
  // const defaultSize = product.variants && product.variants[0].id.toString();
  const [size, setSize] = useState('');
  const [click, setClicked] = useState(false);
  const [available, setAvailable] = useState(true);
  const [sizeSelected, setSizeSelected] = useState(false);
  // const [sizeTitle, setSizeTitle] = useState('');
  const [quantity, setQuantity] = useState(1);
  const description = product.description && product.description.split('.');

  function changeSize(sizeId, quantity) {
    openCart();
    if (sizeId === '') {
      sizeId = product.variants[0].id;
      const lineItemsToAdd = [
        { variantId: sizeId, quantity: parseInt(quantity, 10) },
      ];
      const checkoutId = checkoutState.id;
      addVariant(checkoutId, lineItemsToAdd);
    } else {
      const lineItemsToAdd = [
        { variantId: sizeId, quantity: parseInt(quantity, 10) },
      ];
      const checkoutId = checkoutState.id;
      addVariant(checkoutId, lineItemsToAdd);
    }
  }

  useEffect(() => {
    fetchProduct(productHandle);
  }, [productHandle]);

  return (
    <Container fluid>
      <Row style={{ fontFamily: 'lucon' }}>
        <Col
          sm={{ span: 12 }}
          md={{ span: 7 }}
          style={{
            height: '100vh',
            padding: '100px',
            overflow: 'scroll',
          }}
        >
          {product.images &&
            product.images.map((image, i) => {
              return (
                <img
                  key={image.id + i}
                  src={image.src}
                  alt={`${product.title} product shot`}
                />
              );
            })}
        </Col>
        <Col style={{ height: '100vh' }}>
          <div
            style={{
              height: '100%', // Fixed height for the parent div
              display: 'flex',
              alignItems: 'center', // Vertically centers the child div
              justifyContent: 'center', // Horizontally centers the child div (optional)
            }}
          >
            <div
              style={{
                width: '100%',
                paddingLeft: '40px',
                paddingRight: '40px',
              }}
            >
              <div>
                <h1 style={{ textDecoration: 'underline', fontSize: '20px' }}>
                  {product.title}
                </h1>
                <h3 style={{ fontSize: '20px', paddingTop: '10px' }}>
                  ${product.variants && product.variants[0].price.amount}
                </h3>
                <h3 style={{ fontSize: '20px', paddingTop: '10px' }}>
                  Shipping Calculated at checkout
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center', // Vertically center the items
                    fontSize: '20px',
                  }}
                >
                  Size:
                  {product.variants &&
                    product.variants.map((variant, item) => {
                      return (
                        <div
                          key={variant.title + item}
                          onClick={(e) => {
                            setSize(variant.id.toString());
                            setClicked(item);
                            setAvailable(variant.available);
                            setSizeSelected(true);
                          }}
                          style={{
                            paddingLeft: '40px',
                            cursor: 'pointer',
                            color: variant.available
                              ? `${click === item ? '#FF09B1' : 'black'}`
                              : 'grey',
                          }}
                        >
                          {variant.title}
                        </div>
                      );
                    })}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center', // Vertically center the items
                    fontSize: '20px',
                  }}
                >
                  Quantity:
                  <div
                    className="prodQuantity-container"
                    style={{ paddingLeft: '20px' }}
                  >
                    {quantity > 1 ? (
                      <button
                        className="prodQuantity-update"
                        onClick={() => setQuantity(quantity - 1)}
                      >
                        -
                      </button>
                    ) : (
                      <button className="prodQuantity-update">-</button>
                    )}
                    <span className="prodQuantity" style={{ color: 'black' }}>
                      {quantity}
                    </span>
                    <button
                      className="prodQuantity-update"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '20px',
                    listStyleType: 'none',
                    paddingTop: '10px',
                  }}
                >
                  {description &&
                    description.map((each, i) => {
                      return <li key={`line-description +${i}`}>{each}</li>;
                    })}
                </div>
                {sizeSelected && available ? (
                  <button
                    style={{
                      background: 'black',
                      color: 'white',
                      width: '200px',
                      marginTop: '10px',
                      fontSize: '20px',
                      border: 'none',
                    }}
                    onClick={() => changeSize(size, quantity)}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    style={{
                      background: 'black',
                      color: 'white',
                      width: '200px',
                      marginTop: '10px',
                      fontSize: '20px',
                      border: 'none',
                    }}
                  >
                    {sizeSelected ? 'Out of Stock' : 'Select a Size'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}

{
  /* <Row className="Product-wrapper2">
  <Col
    className="Images"
    style={{ marginLeft: '30px', background: 'red' }}
    sm={{ span: 12 }}
    lg={{ span: 6 }}
    md={{ span: 6 }}
  >
    {product.images &&
      product.images.map((image, i) => {
        return (
          <img
            className="Product_Image"
            key={image.id + i}
            src={image.src}
            alt={`${product.title} product shot`}
          />
        );
      })}
  </Col>
  <Col className="Product__info">
    <h2 className="Product__title2">{product.title}</h2>
    <h3 className="Productview__price">
      ${product.variants && product.variants[0].price}
    </h3>
    <label htmlFor={'prodOptions'} style={{ marginTop: '2%' }}>
      Size
    </label>
    <br />
    <div style={{ width: '90%', position: 'relative' }}>
            <div
              className="style__dropdown"
              id="prodOptions"
              onClick={(e) => {
                setdropDownMenu(!dropDownMenu);
                setRotate(!rotate);
              }}
            >
              {sizeTitle ? sizeTitle : 'Pick a Size'}
              <animated.img
                src={DropDownArrow}
                alt="drop down arrow"
                style={rotationAnimation}
                className="dropDownArrow"
              />
            </div>
            <animated.div
              className="style__dropdownDiv"
              style={dropDownMenuAnimation}
            >
              {product.variants &&
                product.variants.map((item, i) => {
                  return (
                    <li
                      onClick={(e) => {
                        clickFunction(item, i);
                      }}
                      className={
                        item.available ? 'size__option' : 'size__option2'
                      }
                      key={item.title + i}
                    >{`${item.title}`}</li>
                  );
                })}
            </animated.div>
          </div>
    <div style={{ marginTop: '2%' }}>
      <label>Quantity</label>
      <br />
      <div className="prodQuantity-container">
              {quantity > 1 ? (
                <button
                  className="prodQuantity-update"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
              ) : (
                <button className="prodQuantity-update">-</button>
              )}
              <span className="prodQuantity" style={{ color: 'white' }}>
                {quantity}
              </span>
              <button
                className="prodQuantity-update"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
    </div>
    {product.availableForSale ? (
      <button
        className="prodBuyButton"
        onClick={(e) => changeSize(size, quantity)}
      >
        Add to Cart
      </button>
    ) : (
      <button className="prodBuyButtonSold">Sold Out</button>
    )}
    <div className="Product__description">
      {description &&
              description.map((each, i) => {
                return <li key={`line-description +${i}`}>{each}</li>;
              })}
    </div>
  </Col>
</Row>; */
}
