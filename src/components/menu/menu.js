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
import MenuCollections from "./menu_collections";
import MenuPages from "./menu_pages";

/**
 * https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/
 * https://youtu.be/58OD42jyF4o?t=1753 at this moment talk about createpage but not sure
 */

function MenuTemp ({ className }) {
  const [about, set_about] = useState(
    content_by_lang(content.info, "about", "")
  );

  const [pro, set_pro] = useState(
    content_by_lang(content.info, "pro", "")
  );

  const [where, set_where] = useState(
    content_by_lang(content.info, "where", "")
  );

  const [test, set_test] = useState(
    content_by_lang(content.info, "test", "")
  );

  return (
    <nav className={[navStyle, className].join(" ")}>
      <Link
        key="Where"
        className={navLink}
        to="/misc/where/"
        activeClassName={activeLink}
      >
        {where}
      </Link>
      <Link
        key="Test"
        className={navLink}
        to="/misc/test/"
        activeClassName={activeLink}
      >
        {test}
      </Link>
      <Link
        key="Pro"
        className={navLink}
        to="/misc/pro/"
        activeClassName={activeLink}
      >
        {pro}
      </Link>
      <Link
        key="About"
        className={navLink}
        to="/misc/about/"
        activeClassName={activeLink}
      >
        {about}
      </Link>

    </nav>
  )
}



export function Menu({ className }) {
  const [prods, set_prods] = useState(
    content_by_lang(content.collection, "all products", "ALL PRODUCTS")
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
      {/* <MenuTemp className={className}/> */}
      <MenuPages className={className}/>
    </nav>
  );
}
