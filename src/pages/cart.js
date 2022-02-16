import * as React from "react";
// import { useState } from "react";
// gatsby
import { Link } from "gatsby";
// app
import { Layout } from "./../components/layout/layout";
import { ContextStore } from "./../context/context_store";
import { LineItem } from "../components/line_item/line_item";
import { formatPrice } from "./../utils/format_price";
import {
  container,
  table,
  totals,
  grand_total,
  summary,
  checkout_button,
  empty_col,
  product_header,
  empty_state_container,
  empty_state_heading,
  empty_state_link,
  title,
} from "./cart.module.css";
import { content_by_lang } from "./../utils/misc";
// CAFE 366
import content from "./../../media/json/content.json";



export default function CartPage() {
  const { checkout, loading } = React.useContext(ContextStore);
  const emptyCart = checkout.lineItems.length === 0;

  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

  const your_cart = content_by_lang(content.info, "your cart", "");
  const empty_mess = content_by_lang(content.info, "empty message", "");
  const checkout_mess = content_by_lang(content.info, "checkout", "");
  const shipping = content_by_lang(content.info, "shipping", "");
  const cart_empty = content_by_lang(content.info, "cart empty", "");

  const view_trending = content_by_lang(content.info, "view tranding", "");
  const view_all = content_by_lang(content.info, "view all", "");

  return (
    <Layout>
      <div className={container}>
        {emptyCart ? (
          <div className={empty_state_container}>
            <h1 className={empty_state_heading}>{cart_empty}</h1>
            <p>{empty_mess}</p>
            {/* <Link to="/search?s=BEST_SELLING" className={empty_state_link}>
              {view_trending}
            </Link> */}
            <Link to="/product" className={empty_state_link}>
              {view_all}
            </Link>
          </div>
        ) : (
          <>
            <h1 className={title}>{your_cart}</h1>
            <OrderTable shipping={shipping} checkout={checkout}/>
            <div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={checkout_button}
              >
              {checkout_mess}
            </button> 
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}



function OrderTable({shipping, checkout}) {
  const product = content_by_lang(content.info, "product", "");
  const price = content_by_lang(content.info, "price", "");
  const total = content_by_lang(content.info, "total", "");
  const calculated = content_by_lang(content.info, "calculated", "");
  const quantity = content_by_lang(content.info, "quantity", "");

  return(<table className={table}>
    <thead>
      <tr>
        <th className={product_header}>{product}</th>
        <th className={empty_col}>{price}</th>
        <th>{quantity}</th>
        <th className={[totals, empty_col].join(" ")}>
          {total}
        </th>
      </tr>
    </thead>
    <tbody>
      {checkout.lineItems.map((item) => (
        <LineItem item={item} key={item.id} />
      ))}
      <tr className={summary}>
        <td className={empty_col}></td>
        <td className={empty_col}></td>
        <td className={empty_col}></td>
        <td className={empty_col}></td>
        <td className={totals}>{shipping} {calculated}</td>
      </tr>
      <tr className={grand_total}>
        <td className={empty_col}></td>
        <td className={empty_col}></td>
        <td className={empty_col}></td>
        <td className={empty_col}></td>
        <td className={totals}> 
          {total} {formatPrice(checkout.totalPriceV2.currencyCode, checkout.totalPriceV2.amount)}
        </td>
      </tr>
    </tbody>
  </table>
  )
}