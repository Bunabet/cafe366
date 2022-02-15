/**
 * Fiche produit
 * ADD unit
 * v 0.0.1
 * 2022-2022
 *
 */
// REACT
import * as React from "react";
import {useState} from "react";
// CAFE 366
import { AddToCart } from "../../../components/cart/add_to_cart";
import { NumericInput } from "../../../components/numeric_input";
import { addToCartStyle } from "./product_page.module.css";


export function AddUnits({productVariant, available}) {
  const [quantity, setQuantity] = useState(1);

  return (
		<div className={addToCartStyle}>
			<NumericInput
				aria-label="Quantity"
				onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
				onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
				onChange={(event) => setQuantity(event.currentTarget.value)}
				value={quantity}
				min="1"
				max="20"
			/>
			<AddToCart
				variantId={productVariant.storefrontId}
				quantity={quantity}
				available={available}
			/>
		</div>
	)
}