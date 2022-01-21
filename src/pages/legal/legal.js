import * as React from "react";
// gatsby
import { useStaticQuery, graphql } from "gatsby";
// APP
import { Layout } from "./../../components/layout";
import { SelectMD } from "./../../components/markdown";

function LegalContent() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/legal_fr/" } }
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

  return (
    <div>
      <div className="md_container">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <SelectMD className="md_style" node={node} />
        ))}
      </div>
    </div>
  );
}

// markup
const Legal = () => {
  return (
    <Layout>
      <LegalContent />
    </Layout>
  );
};

export default Legal;
