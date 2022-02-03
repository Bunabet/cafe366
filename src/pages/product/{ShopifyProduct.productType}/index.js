// REACT
import * as React from "react";
// MISC
import slugify from "@sindresorhus/slugify";
// GATSBY
import { graphql } from "gatsby";
// CAFE 366
import { Layout } from "../../../components/layout/layout";
import { ProductListing } from "../../../components/product/product_listing";
import { Seo } from "../../../components/seo";
import { MoreButton } from "../../../components/button/button";
import { title } from "../index.module.css";

export default function ProductTypeIndex({
  data: { products },
  pageContext: { productType },
}) {
  // console.log("je suis la liste de produits", products);
  // console.log("je suis le type", productType);
  return (
    <Layout>
      <Seo title={`Category: ${productType}`} />
      <h1 className={title}>{productType}</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search?p=${slugify(productType)}#more`}>
          More Products
        </MoreButton>
      )}
    </Layout>
  );
}

export const query = graphql`
  query ($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
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
