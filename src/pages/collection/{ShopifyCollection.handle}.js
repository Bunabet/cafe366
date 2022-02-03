/// REACT
import * as React from "react";
// GATSVBY
import { graphql } from "gatsby";
// GATSBY SHOPIFY REACT STARTER
import { Layout } from "../../components/layout/layout";
import { ProductListing } from "./../../components/product/product_listing";
import { Seo } from "./../../components/seo";
import { title } from "./collection.module.css";
// CAFE 366

export const query = graphql`
  query ($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      products {
        ...ProductCard
      }
    }
  }
`;

export default function IndexPage({ data }) {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }
  return (
    <Layout>
      <Seo title={`Collection: ${data?.shopifyCollection?.title}`} />
      <h1 className={title}>{data?.shopifyCollection?.title}</h1>
      <ProductListing products={data?.shopifyCollection?.products} />
    </Layout>
  );
}
