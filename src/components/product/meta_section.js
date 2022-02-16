/**
 * Fiche produit
 * META SECTION must be fic and improve for the next relase
 * v 0.0.1
 * 2022-2022
 *
 */
// REACT
import * as React from "react";
// GATSBY
import { Link } from "gatsby";

import { label_font, tag_list, metadata_section } from "./product_order_page.module.css";
// The Search part don't work must be work on it for the future
export function MetaSection({product}) {
  return(
    <div className={metadata_section}>
      <span className={label_font}>Type</span>
      <span className={tag_list}>
        <Link to={product.productTypeSlug}>{product.productType}</Link>
      </span>
      <span className={label_font}>Tags</span>
        <span className={tag_list}>
        {product.tags.map((tag) => (
          <Link to={`/search/search?=${tag}`}>{tag}</Link>
        ))}
      </span>
    </div>
  ) 
}