import * as React from "react";
import { useState } from "react";
// cafe 366
import { StoreContext } from "../../context/store_context";
import { addToCart as addToCartStyle } from "./add_to_cart.module.css";
// app
import { content_by_lang } from "../../utils/misc";
// CAFE 366
import content from "../../../media/json/content.json";
// import { content_by_lang } from "../utils/misc";

export function AddToCart({ variantId, quantity, available, ...props }) {
  const { addVariantToCart, loading } = React.useContext(StoreContext);

  function addToCart(e) {
    e.preventDefault();
    addVariantToCart(variantId, quantity);
  }

  const [add, set_add] = useState(content_by_lang(content.info, "add", ""));
  const [empty, set_empty] = useState(
    content_by_lang(content.info, "empty", "")
  );

  return (
    <button
      type="submit"
      className={addToCartStyle}
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? add : empty}
    </button>
  );
}
