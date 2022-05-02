/* ADD TO CART 
* 2021-2022 
* v 0.1.2
*/
// REACT
import * as React from "react";
import { useState, useContext, useEffect } from "react";
// CAFE 366
import { ContextStore } from "../../context/context_store";
import { addToCart as className_add_to_cart } from "./cart.module.css";
import { content_by_lang } from "../../utils/misc";
import content from "../../../media/json/content.json";
import {Get_width} from "./../../utils/canvas.js";

export function AddToCart({ variantId, quantity, stock_is, ...props }) {
  const { add_item_to_cart, loading } = useContext(ContextStore);

  function add_to_cart(e) {
    e.preventDefault();
    add_item_to_cart(variantId, quantity);
  }

  const [add, set_add] = useState(content_by_lang(content.info, "add", ""));
  const empty = useState(content_by_lang(content.info, "empty", ""));
  
  const width = Get_width();
  useEffect(() => {
    if(width < 400) {
      set_add(content_by_lang(content.info, "add_min", ""));
    } else {
      set_add(content_by_lang(content.info, "add", ""));
    }
  }, [width])
  

  return (
    <button
      type="submit"
      className={className_add_to_cart}
      onClick={add_to_cart}
      disabled={!stock_is || loading}
      {...props}
    >
      {stock_is ? add : empty}
    </button>
  );
}
