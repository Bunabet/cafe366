// REACT
import { useState } from "react";
// GATSBY
import { graphql, useStaticQuery } from "gatsby";

function build_list(edges) {
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


// *** EDITORIAL ***
export default function GetPages() {
  const all = useStaticQuery(
    graphql`
      query {
				allContentfulEditorial {
          edges {
						node {
							titre
              menu
						}
					}
        }
      }
    `
  );
  // don't remove the unused function from useState that's cause undefined missing
  const [elems, set_elems] = useState(build_list(all.allContentfulEditorial.edges));
  return elems;
}


// *** TEST ***
// export default function GetPages() {
//   const all = useStaticQuery(
//     graphql`
//       query {
// 				allContentfulTest {
//           edges {
// 						node {
//              id
// 							titre
// 						}
// 					}
//         }
//       }
//     `
//   );
//   const [elems, set_elems] = useState(build_list(all.allContentfulTest.edges));
//   return elems;
// }
