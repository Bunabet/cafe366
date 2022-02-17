/**
 * CART BUTTON
 * 2022
 * v 0.0.1
 */
// REACT
import * as React from "react";
// CAFE 366
import { quantity } from "./cart.module.css";
import { Panier }  from "./../../icons/picto";

function DisplayQuantity({num}) {
  return <div>{num > 0 && <div className={quantity}>{num}</div>}</div>
}

export function CartButton({ quantity, style, classNameContainer }) {
  return (
    <div >
      <Panier classNameContainer={classNameContainer}/>
      <DisplayQuantity num={quantity}/>
    </div>
  );
}
