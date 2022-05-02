/**
 * CART BUTTON
 * 2022
 * v 0.0.3
 */
// REACT
import * as React from "react";
// CAFE 366
import { quantity_design } from "./cart.module.css";
import { Panier }  from "./../../icons/picto";


export function CartButton({ quantity, classNameContainer, classNamePicto }) {
  return (
    <div className={classNameContainer}>
      <Panier classNamePicto={classNamePicto}/>
      <div className={quantity_design}>{quantity}</div>
    </div>
  );
}
