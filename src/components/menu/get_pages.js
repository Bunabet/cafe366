// REACT
import React from "react";
import { useState } from "react";
// GATSBY
import { graphql, useStaticQuery, Link } from "gatsby";

function build_list(edges) {
  let list = [];
  let buf = [];
  if (edges === undefined) {
    return null;
  }
  // step one add all elements
  for (let i = 0; i < edges.length; i++) {
    const obj = {
      titre: edges[i].node.titre,
      id: edges[i].node.id,
    };
    buf.push(obj);
  }
  return buf;
}


export default function GetPages() {
  const all = useStaticQuery(
    graphql`
      query {
				allContentfulPageSimple {
          edges {
						node {
              id
							titre
						}
					}
        }
      }
    `
  );
  const [elems, set_elems] = useState(build_list(all.allContentfulPageSimple.edges));
  return elems;
}