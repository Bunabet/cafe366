import * as React from "react";
// import { Link } from "gatsby";
// import CartIcon from "../../icons/cart";
// import { cartButton, badge } from "./cart_button.module.css";
import { quantity } from "./cart.module.css";

import { Panier }  from "./../../icons/picto";

function DisplayQuantity({num}) {
  return <div>{num > 0 && <div className={quantity}>{num}</div>}</div>
}

export function CartButton({ quantity, style, classNameContainer }) {
  return (
    <div >
      <Panier stylePicto={style} classNameContainer={classNameContainer}/>
      <DisplayQuantity num={quantity}/>
    </div>
  );
}


//   export function CartButton({ quantity, style, classNameContainer }) {
//     return (
//       <div>
//         <Panier stylePicto={style} classNameContainer={classNameContainer}/>
//         <DisplayQuantity num={quantity}/>
//       </div>
//     );
// }

