/// REACT
import * as React from "react";
// import { useState } from "react";
// GATSBY SHOPIFY REACT STARTER
import { Layout } from "../components/layout";
import { SelectMD } from "../components/markdown";
// gatsby
import { useStaticQuery, graphql } from "gatsby";

import { md_container, md_style } from "./about.module.css";

export default function About() {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  // return <Layout>About</Layout>;
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/about_fr/" } }
        ) {
          edges {
            node {
              id
              html
              frontmatter {
                title
                author
                date
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
        <div className={md_container}>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <SelectMD className={md_style} node={node} />
          ))}
        </div>
      </Layout>
    );
  } else {
    return <Layout />;
  }
}
