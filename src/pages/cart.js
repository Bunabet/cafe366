import * as React from "react";
// import { useState } from "react";
// gatsby
import { Link } from "gatsby";
// app
import { Layout } from "./../components/layout/layout";
import { StoreContext } from "./../context/store_context";
import { LineItem } from "./../components/line_item";
import { formatPrice } from "./../utils/format_price";
import {
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateLink,
  title,
} from "./cart.module.css";
import { content_by_lang } from "./../utils/misc";
// CAFE 366
import content from "./../../media/json/content.json";

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext);
  const emptyCart = checkout.lineItems.length === 0;

  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

  const your_cart = content_by_lang(content.info, "your cart", "");
  const product = content_by_lang(content.info, "product", "");
  const price = content_by_lang(content.info, "price", "");
  const total = content_by_lang(content.info, "total", "");
  // const subtotal = content_by_lang(content.info, "subtotal", "");
  const calculated = content_by_lang(content.info, "calculated", "");
  const quantity = content_by_lang(content.info, "quantity", "");
  const empty_mess = content_by_lang(content.info, "empty message", "");
  const view_prod = content_by_lang(content.info, "view product", "");
  const checkout_mess = content_by_lang(content.info, "checkout", "");
  const shipping = content_by_lang(content.info, "shipping", "");
  const cart_empty = content_by_lang(content.info, "cart empty", "");

  return (
    <Layout>
      <div className={wrap}>
        {emptyCart ? (
          <div className={emptyStateContainer}>
            <h1 className={emptyStateHeading}>{cart_empty}</h1>
            <p>{empty_mess}</p>
            <Link to="/search?s=BEST_SELLING" className={emptyStateLink}>
              {view_prod}
            </Link>
          </div>
        ) : (
          <>
            <h1 className={title}>{your_cart}</h1>
            <table className={table}>
              <thead>
                <tr>
                  <th className={imageHeader}>Image</th>
                  <th className={productHeader}>{product}</th>
                  <th className={collapseColumn}>{price}</th>
                  <th>{quantity}</th>
                  <th className={[totals, collapseColumn].join(" ")}>
                    {total}
                  </th>
                </tr>
              </thead>
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}
                {/* 
                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>{subtotal}</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </td>
                </tr> */}
                {/* <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Taxes</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount
                    )}
                  </td>
                </tr> */}
                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>{shipping}</td>
                  <td className={totals}>{calculated}</td>
                </tr>
                <tr className={grandTotal}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>
                    {price} {total}
                  </td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={checkoutButton}
            >
              {checkout_mess}
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
