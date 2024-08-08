import { useEffect, useState, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useShopify } from "../hooks"
import { useDrag } from "@use-gesture/react"
import clamp from "lodash.clamp"
import useMeasure from "react-use-measure"
import { useSpring, animated } from "@react-spring/web"

import SizeVariant from "./SizeVariants"

function Product(props) {
  const { product, price, description } = props
  const [index, setIndex] = useState(0)
  const [end, setEnd] = useState(false)
  const [ref, { width }] = useMeasure()
  const val = product && product.images[0]
  const countries = product && product.images
  const arr3 = countries.concat(val)
  const arr3Length = arr3.length - 1
  const i = useRef(0)
  const length = Array.from(Array(product && product.images.length).keys())

  const bind = useDrag(
    ({
      movement: [mx],
      direction: [xDir],
      distance,
      dragging,
      tap,
      cancel,
    }) => {
      if (dragging && distance[0] > width / 2) {
        i.current = clamp(i.current + (xDir > 0 ? -1 : 1), 0, arr3Length)
        setIndex(i.current)
        setEnd(false)
        cancel()
      }
      if (!dragging && !tap && i.current === arr3Length) {
        setEnd(true)
      }
      if (tap && i.current !== arr3Length) {
        i.current = i.current + 1
        setIndex(i.current)
        setEnd(false)
      }
      if (tap && i.current === arr3Length) {
        setEnd(true)
      }
      api.start({
        to: {
          x: dragging
            ? -(width * i.current) + (i.current === arr3Length ? 0 : mx)
            : -(width * i.current),
        },
        config: { duration: 250 },
      })
    }
  )

  useEffect(() => {
    if (end) {
      setTimeout(() => {
        api.start({
          to: { x: 0 },
          config: { duration: 0 },
        })
      }, [250])
      i.current = 0
      setIndex(0)
    }
  }, [end])

  const [{ x }, api] = useSpring(() => ({
    from: { x: 0 },
  }))

  return (
    <Col
      lg={{
        span: 4,
        offset: 4,
      }}
      xs={{ span: 12, offset: 0 }}
      key={product.id + i}
      style={{ marginBottom: "5vh", marginTop: "5vh" }}
    >
      <div className="images-product-bind">
        {arr3?.map((images, i) => {
          return (
            <animated.img
              {...bind()}
              ref={ref}
              key={i}
              src={images.src}
              className="img-drag"
              style={{ x }}
            />
          )
        })}
      </div>
      <div className="container-dot-two">
        <div className="container-dot">
          {length &&
            length.map((dot, i) => {
              return (
                <span
                  style={{ background: index === i ? "black" : "#999" }}
                  key={dot}
                  className="dot"
                ></span>
              )
            })}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 className="product-new-title">{product.title}</h1>
        <h3 className="Prod-price-font">${price}0</h3>
        <SizeVariant product={product} description={description} i={i} />
      </div>
    </Col>
  )
}

export default function Products() {
  const { products, fetchProduct } = useShopify()
  const id = "id"

  useEffect(() => {
    fetchProduct(id)
  }, [id])

  return (
    <Container
      fluid
      style={{
        zIndex: "10",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Row>
        {products &&
          products.map((product, i) => {
            const image = product.images[0].src
            const price = product.variants[0].price.amount
            const description =
              product.description && product.description.split(".")
            return (
              <Product
                i={i}
                key={i}
                image={image}
                price={price}
                description={description}
                product={product}
              />
            )
          })}
      </Row>
    </Container>
  )
}
