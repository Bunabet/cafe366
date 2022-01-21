/// REACT
import * as React from "react";
import { useState, useEffect } from "react";
// GATSVBY
import { graphql } from "gatsby";
// GATSBY SHOPIFY REACT STARTER
import { Layout } from "../components/layout";
import { ProductListing } from "../components/product/product_listing";
import {
  container,
  intro,
  callOut,
  callToAction,
  deployButton,
} from "./index.module.css";
// CAFE 366
import content from "../../media/json/content.json";
import { content_by_lang, SetConstants } from "../utils/misc";
// APP
const r = require("./../lib/r_constants_colour");

function Introduction() {
  const [txt_intro, set_txt_intro] = useState(
    content_by_lang(
      content.info,
      "introduction",
      "CAFÉ 366 the real test of the coffee"
    )
  );

  return (
    <div className={container}>
      <h1 className={intro}>{txt_intro}</h1>
    </div>
  );
}

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`;

// function SetConstants(r, brownser_is) {
//   useEffect(() => {
//     if (brownser_is) {
//       localStorage.setItem("constants", JSON.stringify(r));
//     }
//   }, ["constants", r]);
// }

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
  // useEffect(() => {
  //   if (brownser_is) {
  //     localStorage.setItem("constants", JSON.stringify(r));
  //   }
  // }, ["constants", r]);
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
