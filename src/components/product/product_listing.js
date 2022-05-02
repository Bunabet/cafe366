/**
* LISTING PRODUCT
* 2021-2022
* v 0.1.0
*
*/
// REACT
import * as React from "react"
// CAFE 366
import { ProductCard } from "./product_card"
import { listing_container } from "./product_listing.module.css"

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
export function ProductListing({ products = [] }) {
  return (
    <div className={listing_container}>
      {products.map((p, index) => (
        <ProductCard product={p} key={p.id} eager={index === 0} />
      ))}
    </div>
  )
}
