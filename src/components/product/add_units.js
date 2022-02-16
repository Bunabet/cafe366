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
import { AddToCart } from "../cart/add_to_cart";
import { NumericInput } from "../numeric_input";
import { add_to_cart } from "./product_order_page.module.css";


export function AddUnits({productVariant, available}) {
  const [quantity, setQuantity] = useState(1);

  return (
		<div className={add_to_cart}>
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