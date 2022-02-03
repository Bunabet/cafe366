import * as React from "react";
// GATSBY
import { graphql } from "gatsby";
// APP TEMPLATE
import { Layout } from "../../components/layout/layout";
import { ProductListing } from "../../components/product/product_listing";
import { Seo } from "../../components/seo";
import { MoreButton } from "../../components/button/button";
import { title } from "./index.module.css";
// APP CUSTOM
import content from "../../../media/json/content.json";
import { get_lang, find_lang } from "../../utils/misc";

export default function Products({ data: { products } }) {
  // replace the lines below by hooks useState
  let all_prod = "All products";

  if (get_lang() === "fr") {
    all_prod = find_lang(content.collection, "all products", "fr");
  } else {
    all_prod = find_lang(content.collection, "all products", "en");
  }

  return (
    <Layout>
      <Seo title="All Products" />
      <h1 className={title}>{all_prod}</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search#more`}>More products</MoreButton>
      )}
    </Layout>
  );
}

export const query = graphql`
  {
    products: allShopifyProduct(
      sort: { fields: publishedAt, order: ASC }
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
