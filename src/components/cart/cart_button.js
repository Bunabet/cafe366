/**
 * CART BUTTON
 * 2022
 * v 0.0.2
 */
// REACT
import * as React from "react";
// CAFE 366
import { container, quantity_design } from "./cart.module.css";
import { Panier }  from "./../../icons/picto";


// const panier_style = {
//   margin: "0 auto",
//   width: "25px",
//   height: "25px",
// };

export function CartButton({ quantity, classNameContainer }) {
  return (
    <div className={classNameContainer}>
      <Panier/>
      {quantity > 0 ? <div className={quantity_design}>{quantity}</div> : null}
    </div>
  );
}
