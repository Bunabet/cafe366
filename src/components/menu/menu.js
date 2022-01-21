// REACT
import * as React from "react";
import { useState } from "react";
// GATSBY
import { Link } from "gatsby";
// GATSBY SHOPYFY STARTER
import { navStyle, navLink, activeLink } from "./menu.module.css";
// CAFÉ 366
import content from "../../../media/json/content.json";
import { content_by_lang } from "../../utils/misc";
// import MenuProducts from "./menu_products";
import MenuCollections from "./menu_collections";

/**
 * https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/
 * https://youtu.be/58OD42jyF4o?t=1753 at this moment talk about createpage but not sure
 */
export function Menu({ className }) {
  const [prods, set_prods] = useState(
    content_by_lang(content.collection, "all products", "ALL PRODUCTS")
  );

  const [about, set_about] = useState(
    content_by_lang(content.info, "about", "")
  );

  return (
    <nav className={[navStyle, className].join(" ")}>
      <MenuCollections className={className} />
      {/* <MenuProducts className={className} /> */}
      <Link
        key="All"
        className={navLink}
        to="/product/"
        activeClassName={activeLink}
      >
        {prods}
      </Link>
      <Link
        key="About"
        className={navLink}
        to="/about/"
        activeClassName={activeLink}
      >
        {about}
      </Link>
    </nav>
  );
}
