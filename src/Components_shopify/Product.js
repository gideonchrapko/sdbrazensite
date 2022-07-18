import { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useShopify } from "../hooks";

export default () => {
	const {
		products,
		product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()

	// const id = props.match.params.productId
	const id = "id"
	const defaultSize = product.variants && product.variants[0].id.toString();
	const prodLength = products && products.length
	const [size, setSize] = useState("");
	const [click, setClicked] = useState();
	const [quantity, setQuantity] = useState(1);

	function changeSize(sizeId, quantity) {
		openCart()
		if (sizeId === "") {
			sizeId = defaultSize
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		} else {
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		}
	}

	useEffect(() => {
		fetchProduct(id)
	}, [id])

	return (
		<Container fluid >
		{/* <Container className="Product-wrapper"> */}
		<Row>
			{products &&
				products.map((product, i) => {
					const image = product.images[0]
					const description = product.description && product.description.split(".")
					return (
							<Col lg={{span: prodLength === 1 ? 8 : `${prodLength === 2 ? 6 : 4}`, offset: prodLength === 1 ? 2 : 0 }} key={product.id + i} 
								style={{ marginTop: `${window.innerWidth > 600 ? "15vh" : "20vh"}` }}
							>
								{/* image side */}
								<div style={{ float: "left", width: `${window.innerWidth > 600 ? "60%" : "50%"}` }}> 
									{image ? (
										<img  src={image.src} alt={`${product.title} product shot`} />
									) : null}
								</div>
								{/* info side */}
								<div style={{ float: "right", width: `${window.innerWidth > 600 ? "40%" : "50%"}` }}>
									{/* title */}
									<h1 style={{ fontSize: "clamp(30pt, 3vw, 80pt)" }}>{product.title}</h1>
									{/* size */}
									<div style={{ display: "flex", width: "70%", textAlign: 'center' }}>
										{product.variants
											&& product.variants.map((item, i) => {
												const varWidth = 100 / product.variants.length
												return (
													<div
														key={item.title + i}
														onClick={e => {
															setSize(item.id.toString())
															setClicked(i)
														}}
														className='Prod-font-size'
														style={{ 
															cursor: "pointer", 
															width: `${varWidth}%`, 
															color: `${click === i ? "#FF09B1" : "black"}`,
															border: `${click === i ? "4px solid black" : "4px solid transparent"}`
														}}
													>
														{item.title}</div>
												)
											})	
										}
									</div>
									{/* description */}
									<div>
										<ul className="Product__description">
											{description &&
												description.map((each, i) => {
													return <li key={`line-description +${i}`}>{each}</li>
											})}
										</ul>
									</div>
									{/* Add to Cart */}
									<div>
										<h3 
											style={{ cursor: "pointer" }} 
											onClick={(e) => changeSize(size, quantity)}
											className='Prod-cart'
										>
												ADD TO CART
										</h3>
									</div>
								</div>
							</Col>
					)
				})}
			</Row>
		</Container>
	)
}

{/* 							
							<div className="Product" key={product.id + i}>
								{image ? (
									<img src={image.src} alt={`${product.title} product shot`} />
								) : null}
							</div>
							<div>
								<div>
									<h4 className="Product__title">{product.title}</h4>
									<p className="Product__price">${product.variants[0].price}</p>
								</div>
								<div>
							<label htmlFor={"prodOptions"}>Size</label>
							<select
								id="prodOptions"
								name={size}
								onChange={(e) => {
									setSize(e.target.value)
								}}
							>
								{product.variants &&
									product.variants.map((item, i) => {
										return (
											<option
												value={item.id.toString()}
												key={item.title + i}
											>{`${item.title}`}</option>
										)
									})}
							</select>
						</div>
								<div className="Product__Description">
									<ul className="Product__description">
										{description &&
											description.map((each, i) => {
												return <li key={`line-description +${i}`}>{each}</li>
										})}
									</ul>
								</div>
								<button
									className="Product__buy button"
									// onClick={(e) => handleClick(e, product.id)}
									onClick={(e) => changeSize(size, quantity)}
								>
									Add to Cart
								</button>
							</div> */}