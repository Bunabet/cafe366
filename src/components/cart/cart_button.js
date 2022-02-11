import * as React from "react";
import { Link } from "gatsby";
import CartIcon from "../../icons/cart";
import { cartButton, badge } from "./cart_button.module.css";

export function CartButton({ quantity }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className={cartButton}
    >
      <CartIcon />
       {/* 
       
       
       
       
       C'EST LA LE PROBLEM du logo de quantité qui n'est pas au bon endroit
       
       
       
       */}
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </Link>
  );
}
