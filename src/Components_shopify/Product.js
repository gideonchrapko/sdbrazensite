import { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useShopify } from "../hooks";
import sanityClient from '../client';

export default () => {
	const {
		products,
		// product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()

	// const id = props.match.params.productId
	const id = "id"
	// const defaultSize = products.variants && products.variants[0].id.toString();
	// const outOfStock = product.variants && product.variants[0]
	const prodLength = products && products.length
	const [size, setSize] = useState("");
	const [click, setClicked] = useState();
	const [singlePost, setSinglePost] = useState();
	const [quantity, setQuantity] = useState(1);
	const [available, setAvailable] = useState(true);
	const [prodIndex, setProdIndex] = useState(0);

	function changeSize(sizeId, quantity) {
		openCart()
		if (sizeId === "") {
			sizeId = products[prodIndex].variants[0].id
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

	useEffect(() => {
		sanityClient.fetch(`*[_type == "productImages"]{
			mainImage{
			asset->{
			  _id,
			  url
			},
			alt
		  },
		 }`)
		.then((data) => setSinglePost(data))
		.catch(console.error)
	  },[])

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
									<div>
										{singlePost && singlePost[i] ?
											<img src={singlePost && singlePost[i].mainImage.asset.url} style={{ height: "120px" }} />
											:
											<h1 style={{ fontSize: "clamp(30pt, 3vw, 80pt)" }}>{product.title}</h1>
										}
									</div>
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
															setAvailable(item.available)
														}}
														className='Prod-font-size'
														style={{ 
															cursor: "pointer", 
															width: `${varWidth}%`,
															color: item.available ? `${click === i ? "#FF09B1" : "black"}` : "grey",
															border: `${click === i ? "4px solid black" : "4px solid transparent"}`,
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
										{product.variants[0].available && available ?
											<h3 
												style={{ cursor: "pointer" }} 
												onClick={(e) => {
													changeSize(size, quantity)
													setProdIndex(i)
												}}
												className='Prod-cart'
											>
													ADD TO CART
											</h3>
											:
											<h3 
												style={{ 
													cursor: "not-allowed", 
													color: "grey" 
												}} 
												className='Prod-cart'
											>
												PICK ANOTHER SIZE
											</h3>
										}
									</div>

								</div>
							</Col>
					)
				})}
			</Row>
		</Container>
	)
}