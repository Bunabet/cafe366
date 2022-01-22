/// REACT
import * as React from "react";
// GATSBY SHOPIFY REACT STARTER
import { Layout } from "../../components/layout";
import { SelectMD } from "../../components/markdown";
// gatsby
import { useStaticQuery, graphql } from "gatsby";

import { container_style, txt_style } from "./misc_page.module.css";

export default function About() {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  const data = useStaticQuery(
    graphql`
      query {
        allContentfulPageSimple(filter: {titre: {eq: "Café 366 ?"}}) {

          edges {
            node {
              contentful_id
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
        }
      }
    `
  );
  if (data !== undefined) {
    return (
      <Layout>
        <div className={container_style}>
          {data.allContentfulPageSimple.edges.map(({ node }) => (
            <SelectMD className={txt_style} node={node.contenu.childMarkdownRemark} />
          ))}
        </div>
      </Layout>
    );
  } else {
    return <Layout />;
  }
}
