// import { useState, useEffect } from "react";
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useShopify } from '../hooks'
// import sanityClient from '../client';

import SizeVariant from './SizeVariants'

export default () => {
  const { products, fetchProduct } = useShopify()

  const id = 'id'
  const prodLength = products && products.length
  const mobileView = window.innerWidth > 600

  useEffect(() => {
    fetchProduct(id)
  }, [id])

  return (
    <Container
      fluid
      style={{ zIndex: '10', overflow: 'hidden', height: '100%' }}
    >
      <Row style={{ overflowY: 'hidden', height: '100%' }}>
        {products &&
          products.map((product, i) => {
            const image = product.images[0]
            const imageTitle = product.images[1]
            const description =
              product.description && product.description.split('.')
            return (
              <Col
                lg={{
                  span: prodLength === 1 ? 8 : 5,
                  offset: prodLength === 1 ? 2 : `${i % 2 === 0 ? 1 : 0}`,
                }}
                xs={{ span: 8, offset: 2 }}
                key={product.id + i}
                style={{ marginTop: '20vh' }}
              >
                <div
                  style={{
                    transform: mobileView ? 'scale(1)' : 'scale(1.15)',
                    float: 'left',
                    width: `${mobileView ? '60%' : '100%'}`,
                  }}
                >
                  {image ? (
                    <img src={image.url} alt={`${product.title}`} />
                  ) : null}
                </div>
                <div
                  style={{
                    float: 'right',
                    width: `${mobileView ? '40%' : '100%'}`,
                  }}
                >
                  <div>
                    {imageTitle ? (
                      <img
                        src={imageTitle.url}
                        alt={`${product.title}`}
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <h1 style={{ fontSize: 'clamp(30pt, 3vw, 80pt)' }}>
                        {product.title}
                      </h1>
                    )}
                  </div>
                  <div>
                    <h3 className="Prod-price-font">
                      ${product.variants[0].price}
                    </h3>
                  </div>
                  <SizeVariant
                    product={product}
                    description={description}
                    i={i}
                  />
                </div>
              </Col>
            )
          })}
      </Row>
    </Container>
  )
}
