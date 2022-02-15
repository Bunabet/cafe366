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

import { labelFont, tagList, metaSection } from "./product_page.module.css";
// The Search part don't work must be work on it for the future
export function MetaSection({product}) {
  return(
    <div className={metaSection}>
      <span className={labelFont}>Type</span>
      <span className={tagList}>
        <Link to={product.productTypeSlug}>{product.productType}</Link>
      </span>
      <span className={labelFont}>Tags</span>
        <span className={tagList}>
        {product.tags.map((tag) => (
          <Link to={`/search/search?=${tag}`}>{tag}</Link>
        ))}
      </span>
    </div>
  ) 
}