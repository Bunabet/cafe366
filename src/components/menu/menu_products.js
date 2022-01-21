// REACT
import React from "react";
// OTHER
import slugify from "@sindresorhus/slugify";
// GATSBY
import { graphql, useStaticQuery, Link } from "gatsby";
// GATSBY SHOPYFY STARTER
import { navStyle, navLink, activeLink } from "./menu.module.css";

function LinkProduct({ type }) {
  console.log("LinkProduct:", `/product/${slugify(type)}`);
  return (
    <div>
      <Link
        key={type}
        className={navLink}
        to={`/product/${slugify(type)}`}
        activeClassName={activeLink}
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

  console.log("product_type", product_type);

  return (
    <div className={[navStyle, className].join(" ")}>
      {product_type.map((elem) => {
        return <LinkProduct type={elem} />;
      })}
    </div>
  );
}
