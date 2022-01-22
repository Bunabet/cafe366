// REACT
import React from "react";
import { useState } from "react";
// OTHER
import slugify from "@sindresorhus/slugify";
// GATSBY
import { graphql, useStaticQuery, Link } from "gatsby";
// GATSBY SHOPYFY STARTER
import { navStyle, navLink, activeLink } from "./menu.module.css";

function LinkCollection({ handle, title }) {
  return (
    <div>
      <Link
        key={handle}
        className={navLink}
        to={`/collection/${slugify(handle)}`}
        activeClassName={activeLink}
      >
        {title}
      </Link>
    </div>
  );
}

function build_list(nodes) {
  let list = [];
  let buf = [];
  if (nodes === undefined) {
    return null;
  }
  // step one add all elements
  for (let i = 0; i < nodes.length; i++) {
    const obj = {
      handle: nodes[i].handle,
      title: nodes[i].title,
    };
    buf.push(obj);
  }


  // build finale list
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

export default function MenuCollections({ className }) {
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
  const [elems, set_elems] = useState(build_list(all.allShopifyCollection.nodes));
  return (
    <div className={[navStyle, className].join(" ")}>
      {elems.map((elem) => {
        if (elem.handle !== "frontpage") {
          return <LinkCollection handle={elem.handle} title={elem.title} />;
        }
      })}
    </div>
  );
}
