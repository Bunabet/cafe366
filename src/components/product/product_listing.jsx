import * as React from "react"
// app
import { ProductCard } from "./product_card"
import { listingContainerStyle } from "./product_listing.module.css"

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
export function ProductListing({ products = [] }) {
  return (
    <div className={listingContainerStyle}>
      {products.map((p, index) => (
        <ProductCard product={p} key={p.id} eager={index === 0} />
      ))}
    </div>
  )
}
