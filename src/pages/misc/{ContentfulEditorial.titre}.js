/**
 * CONTENFUL EDITORIAL
 * 2022-2022
 * v 0.1.0
 * */

/// REACT
import * as React from "react";
// GATSBY
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
// CAFE 366
import { Layout } from "../../components/layout/layout";
import { MarkdownDesign } from "../../components/markdown";

import { container, article,
        container_image, image } from "./../../css/article.module.css";

import { FormPro } from "../../components/form/form_pro";



export default function Page({data}) {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  const node = data.contentfulEditorial;
  const category = node.menu.toLowerCase();

  if (node.contenu !== undefined) {
    return (
      <Layout>
        <div className={container}>
          <div className={article}>
            <h1>{node.sousTitre}</h1>
          </div>
          
          <div className={container_image}>
            <GatsbyImage alt={node.image.title} className={image} image={node.image.gatsbyImageData} />
          </div>
          {category === "pro" ? <FormPro name="truc">Un message, c'est ici..</FormPro> : null}
          <MarkdownDesign className={article} node={node.contenu.childMarkdownRemark} />
        </div>
      </Layout>
    );
  } else {
    return <Layout />;
  }
}


export const query = graphql`
query($titre: String!) {
	contentfulEditorial(titre: {eq: $titre}) {
      titre
      menu
      sousTitre
      contenu {
        childMarkdownRemark {
          html
          frontmatter {
            title
          }
        }
      }
      image {
        title
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`;