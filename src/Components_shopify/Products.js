import React from "react"
import { useNavigate } from "react-router-dom"
import { useShopify } from "../hooks"

import Product from "./Product"


export default (props) => {
	const { products, fetchProduct } = useShopify()
	let navigate = useNavigate()

	function handleClick(e, product_id) {
		e.preventDefault()
		const id = product_id
		fetchProduct(id).then((res) => {
			navigate(`/shop/${res.id}`)
		})
	}

	return (
		<div className="Products-wrapper">
			<Product history={props.history} />
		</div>
	)
}