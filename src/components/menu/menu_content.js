// REACT
import * as React from "react";
import { useState } from "react";
// GATSBY
import { Link } from "gatsby";
// CAFE 366
import { nav_link, active_link } from "./menu.module.css";
import content from "../../../media/json/content.json";
import { content_by_lang } from "../../utils/misc";
import GetPages from "./get_pages";
import GetCollections from "./get_collections";
import LinkMenu from "./link_menu";

export default function MenuContent() {
  const [prods, set_prods] = useState(
    content_by_lang(content.collection, "all products", "ALL PRODUCTS")
  );
  return (
    <>
      {GetCollections().map((elem) => {
      if (elem.handle !== "frontpage") {
        return <LinkMenu id={elem.handle} path="/collection/" title={elem.title}/>;
      }
      })}
      <Link
        key="All"
        className={nav_link}
        to="/product/"
        activeClassName={active_link}
      >
        {prods}
      </Link>
      {GetPages().map((elem) => {
        return <LinkMenu id={elem.id} path={"/misc/"} title={elem.titre} />;
      })}
    </>
  )
}