import * as React from "react";
// gatsby
import { useStaticQuery, graphql } from "gatsby";
// APP
import { Layout } from "./../../components/layout/layout";
import { MarkdownDesign } from "./../../components/markdown";

import { container, article } from "./legal.module.css";

function LegalContentFR() {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulPageLegale(filter: {titre: {eq: "Mentions légales"}}) {
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
          <MarkdownDesign className={article} node={node.contenu.childMarkdownRemark} />
        ))}
      </div>
    </div>
  );
}

// markup
const Legal = () => {
  return (
    <Layout>
      <LegalContentFR />
    </Layout>
  );
};

export default Legal;
