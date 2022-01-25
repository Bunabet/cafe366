/// REACT
import * as React from "react";
// GATSBY SHOPIFY REACT STARTER
import { Layout } from "../../components/layout";
import { SelectMD } from "../../components/markdown";
// gatsby
import { graphql } from "gatsby";

import { container_style, txt_style } from "./misc_page.module.css";

export default function Test({data}) {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

	// console.log("je suis là 0", data.contentfulPageSimple.titre);
  if (data !== undefined) {
		// console.log("je suis là 1", data.allContentfulPageSimple.edges.node.titre);
		// console.log("je suis là 1", data.contentfulPageSimple.titre);
    return (
      <Layout>
				{/* <div className={container_style}>
          {data.allContentfulPageSimple.edges.map(({ node }) => (
            <SelectMD className={txt_style} node={node.contenu.childMarkdownRemark} />
          ))}
        </div> */}

				<SelectMD className={txt_style} node={data.contentfulPageSimple.contenu.childMarkdownRemark} />
        {/* {data.contentfulPageSimple.titre} */}
      </Layout>
    );
  } else {
		console.log("je suis là 2", data);
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


// export const query = graphql`
//   query {
//     contentfulPageSimple(titre: {eq: "Où nous trouver ?"}) {
//       id
//       titre
//       contenu {
//         childMarkdownRemark {
//           html
//           frontmatter {
//             title
//           }
//         }
//       }
//       image {
//         gatsbyImageData
//       }
//     }
//   }
// `;





// export const query = graphql`
//   query {
//     allContentfulPageSimple(filter: {titre: {eq: "Où nous trouver ?"}}) {
//       edges {
// 				node {
// 					titre
// 					contenu {
// 						childMarkdownRemark {
// 							html
// 							frontmatter {
// 								title
// 							}
// 						}
// 					}
// 					image {
// 						gatsbyImageData
// 					}
// 				}
// 			}
//     }
//   }
// `;


