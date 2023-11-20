import { useEffect, useCallback, useState, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useShopify } from "../hooks"
import { useDrag } from "@use-gesture/react"
import clamp from "lodash.clamp"
import useMeasure from "react-use-measure"
import { useSpring, animated } from "@react-spring/web"

import SizeVariant from "./SizeVariants"

function Product(props) {
  const { product, price, description } = props
  // const [toggle, setToggle] = useState(false)
  const [index, setIndex] = useState(0)
  const [end, setEnd] = useState(false)
  const [ref, { width }] = useMeasure()
  // console.log(product && product.images)
  const val = product && product.images[0]
  const countries = product && product.images
  const arr3 = countries.concat(val)
  const arr3Length = arr3.length - 1
  const i = useRef(0)
  // const handleClick = useCallback(() => {
  //   setToggle((prev) => !prev)
  // }, [])
  // const length = Array.from(Array(product.media.nodes.length).keys())
  const length = Array.from(Array(product && product.images.length).keys())

  // console.log(current)

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

  console.log(x)

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
      <div className="images-product-bind lg:col-span-2">
        {arr3?.map((images, i) => {
          return (
            <animated.img
              {...bind()}
              ref={ref}
              key={i}
              src={images.src}
              // sizes="(min-width: 22.5em) 25vw, 50vw"
              className="img-drag"
              style={{ x }}
            />
          )
        })}
        <div className="absolute bottom-0 w-full text-center container-dot">
          {length &&
            length.map((dot, i) => {
              return (
                <span
                  style={{ background: index === i ? "#999" : "black" }}
                  key={dot}
                  className="dot"
                  // className={`dot w-[7px] h-[7px] md:h-[8px] md:w-[8px] rounded-3xl mx-[3px] ${
                  //   index === i ? "bg-black" : "bg-grey"
                  // } inline-block`}
                ></span>
              )
            })}
        </div>
      </div>
      {/* {image ? (
        <img
          src={toggle ? imageTwo : image}
          onClick={handleClick}
          alt={`${product.title}`}
        />
      ) : null}
      <div className="dot-div">
        <span
          className="dot"
          style={{ background: toggle ? "#999" : "black" }}
        ></span>
        <span
          className="dot"
          style={{ background: !toggle ? "#999" : "black" }}
        ></span>
      </div> */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 className="product-new-title">{product.title}</h1>
        <h3 className="Prod-price-font">${price}</h3>
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
            const imageTwo = product.images[1].src
            const price = product.variants[0].price.amount
            const description =
              product.description && product.description.split(".")
            return (
              <Product
                i={i}
                key={i}
                image={image}
                imageTwo={imageTwo}
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
