/// REACT
import * as React from "react";
// GATSBY SHOPIFY REACT STARTER
import { Layout } from "../../components/layout";
import { SelectMD } from "../../components/markdown";
// gatsby
import { graphql } from "gatsby";

import { container, article } from "./misc_page.module.css";

export default function Page({data}) {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  const node = data.contentfulPageSimple;

  
  console.log("data.titre",node.titre);
  console.log("data.contenu",node.contenu);
  if (node.contenu !== undefined) {
    console.log("data.titre",node.titre);
    console.log("data.contenu",node.contenu);
    return (
      <Layout>
        <div className={container}>
        <SelectMD className={article} node={node.contenu.childMarkdownRemark} />
        </div>
      </Layout>
    );
  } else {
    return <Layout />;
  }
}


export const query = graphql`
  query($id: String!) {
    contentfulPageSimple(id: {eq: $id}) {
      id
      titre
      contenu {
        childMarkdownRemark {
          html
          frontmatter {
            title
          }
        }
      }
      image {
        gatsbyImageData
      }
    }
  }
`;
