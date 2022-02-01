import * as React from "react";
// gatsby
import { useStaticQuery, graphql } from "gatsby";
// APP
import { Layout } from "./../../components/layout";
import { SelectMD } from "./../../components/markdown";

import { container, article } from "./legal.module.css";

function CGVContentFR() {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulPageLegale(filter: {titre: {eq: "Conditions générales de vente"}}) {
          edges {
            node {
              contenu {
                childMarkdownRemark {
                  html
                  frontmatter {
                    title
                  }
                }
              }    
              titre
            }
          }
        }
      }
    `
  );

  return (
    <div>
      <div className={container}>
        {data.allContentfulPageLegale.edges.map(({ node }) => (
          <SelectMD className={article} node={node.contenu.childMarkdownRemark} />
        ))}
      </div>
    </div>
  );
}

// markup
const CGV = () => {
  return (
    <Layout>
      <CGVContentFR />
    </Layout>
  );
};

export default CGV;
