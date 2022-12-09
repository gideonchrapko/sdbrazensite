import { useEffect, useState } from 'react'
import { useShopify } from "../hooks";

const SizeVariant = (props) => {
    const {
		products,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()
    
    const { description, product, i } = props
	const [click, setClicked] = useState();
    const [size, setSize] = useState("");
    const [available, setAvailable] = useState(true);
	const [sizeSelected, setSizeSelected] = useState(false)
    const [quantity, setQuantity] = useState(1);
	const [prodIndex, setProdIndex] = useState(0);

	//only on page load

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

    return(
        <div>
            <div style={{ display: "flex", width: "100%", textAlign: 'center' }} >
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
									setSizeSelected(true)
                                }}
                                className='Prod-font-size'
                                style={{ 
                                    cursor: "pointer", 
                                    width: `${varWidth}%`,
                                    color: variant.available ? `${click === item ? "#FF09B1" : "black"}` : "grey",
                                    border: `${click === item ? "4px solid black" : "4px solid transparent"}`,
                                }}
                            >
                                {variant.title}</div>
                        )
                    })	
                }
	    </div>
            <div>
                <ul className="Product__description">
                    {description &&
                        description.map((each, i) => {
                            return <li key={`line-description +${i}`}>{each}</li>
                    })}
                </ul>
            </div>
            <div>
				{sizeSelected && available ?
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
						{sizeSelected ? "OUT OF STOCK" : "PICK A SIZE"}
					</h3>
				}
			</div>
        </div>
    )
}

export default SizeVariant