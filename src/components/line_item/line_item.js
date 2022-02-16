/**
 * LIGNE PRODUIT DESIGN PANIER
 * v 0.1.1
 * 2021-2022
 *
 */
// REACT
import * as React from "react";
import { useState, useContext, useMemo, useCallback } from "react";
// MISC
import debounce from "lodash.debounce";
// GATSBY
import { GatsbyImage } from "gatsby-plugin-image";
import { getShopifyImage } from "gatsby-source-shopify";
// APP
import { ContextStore } from "../../context/context_store";
import { formatPrice } from "../../utils/format_price";
import DeleteIcon from "../../icons/delete";
import { NumericInput } from "../numeric_input";
import { content_by_lang } from "../../utils/misc";
// CSS
import {
  container,
  title,
  remove,
  variant,
  totals,
  price_column,
} from "./line_item.module.css";

// CAFE 366
import content from "../../../media/json/content.json";

export function LineItem({ item }) {
  const { removeLineItem, checkout, updateLineItem, loading } =
    useContext(ContextStore);
  const [quantity, setQuantity] = useState(item.quantity);

  const [remove_item, set_remove_item] = useState(
    content_by_lang(content.info, "remove", "")
  );

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  };
  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount)
  );

  const subtotal = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount) * quantity
  );

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id);
  };

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  );
  // eslint-disable-next-line
  const debouncedUli = useCallback((value) => uli(value), []);

  const handleQuantityChange = (value) => {
    if (value !== "" && Number(value) < 1) {
      return;
    }
    setQuantity(value);
    if (Number(value) >= 1) {
      debouncedUli(value);
    }
  };

  function do_increment() {
    handleQuantityChange(Number(quantity || 0) + 1);
  }

  function do_decrement() {
    handleQuantityChange(Number(quantity || 0) - 1);
  }

  const image = useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        crop: "contain",
        width: 160,
        height: 160,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variantImage.src]
  );

  return (
    <tr>
      <td>
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
      </td>
      <td>
        <h2 className={title}>{item.title}</h2>
        <div className={variant}>
          {item.variant.title === "Default Title" ? "" : item.variant.title}
        </div>
        <div className={remove}>
          <button onClick={handleRemove}>
            <DeleteIcon /> {remove_item}
          </button>
        </div>
      </td>
      <td className={price_column}>{price}</td>
      <td>
        <NumericInput
          disabled={loading}
          value={quantity}
          aria-label="Quantity"
          onIncrement={do_increment}
          onDecrement={do_decrement}
          onChange={(e) => handleQuantityChange(e.currentTarget.value)}
        />
      </td>
      <td className={totals}>{subtotal}</td>
    </tr>
  );
}
