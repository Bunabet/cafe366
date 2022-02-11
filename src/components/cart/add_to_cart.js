import * as React from "react";
import { useState } from "react";
// cafe 366
import { ContextStore } from "../../context/context_store";
import { addToCart as className_add_to_cart } from "./add_to_cart.module.css";
// app
import { content_by_lang } from "../../utils/misc";
// CAFE 366
import content from "../../../media/json/content.json";
// import { content_by_lang } from "../utils/misc";

export function AddToCart({ variantId, quantity, available, ...props }) {
  const { add_item_to_cart, loading } = React.useContext(ContextStore);

  function add_to_cart(e) {
    e.preventDefault();
    add_item_to_cart(variantId, quantity);
  }

  const [add, set_add] = useState(content_by_lang(content.info, "add", ""));
  const [empty, set_empty] = useState(
    content_by_lang(content.info, "empty", "")
  );

  return (
    <button
      type="submit"
      className={className_add_to_cart}
      onClick={add_to_cart}
      disabled={!available || loading}
      {...props}
    >
      {available ? add : empty}
    </button>
  );
}
