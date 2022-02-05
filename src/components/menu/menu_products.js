// REACT
import React from "react";
// OTHER
import slugify from "@sindresorhus/slugify";
// GATSBY
import { graphql, useStaticQuery, Link } from "gatsby";
// GATSBY SHOPYFY STARTER
import { nav_style, nav_link, active_link } from "./menu.module.css";

function LinkProduct({ type }) {
  return (
    <div>
      <Link
        key={type}
        className={nav_link}
        to={`/product/${slugify(type)}`}
        activeClassName={active_link}
      >
        {type}
      </Link>
    </div>
  );
}

export default function MenuProducts({ className }) {
  const {
    allShopifyProduct: { product_type },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        product_type: distinct(field: productType)
      }
    }
  `);

  return (
    <div className={[nav_style, className].join(" ")}>
      {product_type.map((elem) => {
        return <LinkProduct type={elem} />;
      })}
    </div>
  );
}
