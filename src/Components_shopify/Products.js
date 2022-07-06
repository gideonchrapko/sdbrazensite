import React from "react"
import Product from "./Product"

export default (props) => {
	return (
		<div className="Products-wrapper">
			<h1>Home</h1>
			<Product history={props.history} />
		</div>
	)
}