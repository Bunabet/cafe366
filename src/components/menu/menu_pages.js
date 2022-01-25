// REACT
import React from "react";
import { useState } from "react";
// OTHER
import slugify from "@sindresorhus/slugify";
// GATSBY
import { graphql, useStaticQuery, Link } from "gatsby";
// GATSBY SHOPYFY STARTER
import { navStyle, navLink, activeLink } from "./menu.module.css";

function LinkPages({ id, titre }) {
  return (
    <div>
      <Link
        key={id}
        className={navLink}
        to={`/misc/${id}`}
        activeClassName={activeLink}
      >
        {titre}
      </Link>
    </div>
  );
}

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

export default function MenuPages({ className }) {
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
  return (
    <div className={[navStyle, className].join(" ")}>
      {elems.map((elem) => {
        return <LinkPages id={elem.id} titre={elem.titre} />;
      })}
    </div>
  );
}
