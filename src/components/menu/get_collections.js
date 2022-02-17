// REACT
import { useState } from "react";
// GATSBY
import { graphql, useStaticQuery } from "gatsby";

function build_list(nodes) {
  let list = [];
  let buf = [];
  if (nodes === undefined) {
    return null;
  }
  // step one add all elements
	// we do that because there is a lot of differents elements is from a same collection
  for (let i = 0; i < nodes.length; i++) {
    const obj = {
      handle: nodes[i].handle,
      title: nodes[i].title,
    };
    buf.push(obj);
  }

  // build finale list and add collection only once
  for (let i = 0; i < buf.length; i++) {
    let obj_temp = buf[i];
    if (list.length === 0) {
      list.push(obj_temp);
    } else {
      let add_is = true;
      for (let k = 0; k < list.length; k++) {
        if (obj_temp.handle === list[k].handle) {
          add_is = false;
          break;
        }
      }
      if (add_is) {
        list.push(obj_temp);
      }
    }
  }
  return list;
}


export default function GetCollections() {
  const all = useStaticQuery(
    graphql`
      query {
        allShopifyCollection {
          nodes {
            title
            handle
          }
        }
      }
    `
  );
  // don't remove the unused function from useState that's cause undefined missing
  const [elems, set_elems] = useState(build_list(all.allShopifyCollection.nodes));
  return elems;
}