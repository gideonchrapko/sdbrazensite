// import { useState, useEffect } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useShopify } from "../hooks";
// import sanityClient from '../client';

import SizeVariant from "./SizeVariants";

export default () => {
	const {
		products,
		fetchProduct,
	} = useShopify()

	const id = "id"
	const prodLength = products && products.length
	// const [singlePost, setSinglePost] = useState();

	useEffect(() => {
		fetchProduct(id)
	}, [id])

	// useEffect(() => {
	// 	sanityClient.fetch(`*[_type == "productImages"]{
	// 		mainImage{
	// 		asset->{
	// 		  _id,
	// 		  url
	// 		},
	// 		alt
	// 	  },
	// 	 }`)
	// 	.then((data) => setSinglePost(data))
	// 	.catch(console.error)
	//   },[])

	return (
		<Container fluid style={{ zIndex: "10", overflowY: "scroll" }}>
			<Row>
				{products &&
					products.map((product, i) => {
						const image = product.images[0]
						const imageTitle = product.images[1]
						const description = product.description && product.description.split(".")
						return (
							<Col lg={{ span: prodLength === 1 ? 8 : 5, offset: prodLength === 1 ? 2 : `${i % 2 === 0 ? 1 : 0}` }} xs={{ span: 8, offset: 2 }} 
								key={product.id + i} style={{ marginTop: "20vh" }}
							>
								{/* image side */}
								<div style={{ float: "left", width: `${window.innerWidth > 600 ? "60%" : "100%"}` }}> 
									{image ? (
										<img  src={image.src} alt={`${product.title}`} />
									) : null}
								</div>

								{/* info side */}
								<div style={{ float: "right", width: `${window.innerWidth > 600 ? "40%" : "100%"}` }}>
									{/* title */}
									<div>
										{imageTitle ? (
											<img  src={imageTitle.src} alt={`${product.title}`} style={{ width: "100%" }} />
										) : <h1 style={{ fontSize: "clamp(30pt, 3vw, 80pt)" }}>{product.title}</h1>}
									</div>
									<div>
										<h3 className="Prod-price-font">${product.variants[0].price}</h3>
									</div>
									<SizeVariant 
										product={product} 
										description={description}
										i={i}
									/>
									{/* <div style={{ display: "flex", width: "100%", textAlign: 'center' }} >
										{product.variants
											&& product.variants.map((variant, item) => {
												const varWidth = 100 / product.variants.length
												return (
													<div
														key={variant.title + item}
														onClick={e => {
															setSize(variant.id.toString())
															setClicked(item)
															setAvailable(variant.available)
														}}
														className='Prod-font-size'
														style={{ 
															cursor: "pointer", 
															width: `${varWidth}%`,
															color: variant.available ? `${click === item && i === item ? "#FF09B1" : "black"}` : "grey",
															border: `${click === item && i === item ? "4px solid black" : "4px solid transparent"}`,
														}}
													>
														{variant.title}</div>
												)
											})	
										}
									</div> */}

									{/* description */}
									{/* <div>
										<ul className="Product__description">
											{description &&
												description.map((each, i) => {
													return <li key={`line-description +${i}`}>{each}</li>
											})}
										</ul>
									</div> */}

									{/* Add to Cart */}
									{/* <div>
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
									</div> */}

								</div>
							</Col>
					)
				})}
			</Row>
		</Container>
	)
}