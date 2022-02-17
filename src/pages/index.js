/// REACT
import * as React from "react";
// import { useState, useEffect } from "react";
// GATSVBY
import { graphql } from "gatsby";
// GATSBY SHOPIFY REACT STARTER
import { Layout } from "../components/layout/layout";
import { ProductListing } from "../components/product/product_listing";
import { Introduction } from "../components/home/home";

// CAFE 366
import { SetConstants } from "../utils/misc";
// APP
const r = require("./../lib/r_constants_colour");


export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`;

export default function IndexPage({ data }) {
  // local Storage part
  const brownser_is = typeof window !== "undefined";
  // constants
  /**
   *  Deal with SSR Gatsby rendering problem with class Object need to pass by useState, useEffect
   *  https://blog.logrocket.com/using-localstorage-react-hooks/
   *  https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
   */
  SetConstants(r, brownser_is);

  // language
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  return (
    <Layout>
      <Introduction />
      <ProductListing products={data?.shopifyCollection?.products} />
    </Layout>
  );
}
