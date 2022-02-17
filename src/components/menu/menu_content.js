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

/**
 * Here I'm not sure it's necessary to create two compenent
 * But there is a problem of display the menu when there is a <div></div> instead <Fragment></Fragment> for the big Menu
 * 
 */


function RenderBig() {
  const prods = useState(content_by_lang(content.collection, "all products", "ALL PRODUCTS"));

  return(
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
    </>)
}


function RenderSmall() {
  const prods = useState(content_by_lang(content.collection, "all products", "ALL PRODUCTS"));

  return(
    <div>
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
    </div>
  )
}

export default function MenuContent({className, style}) {
  if(className === undefined && style === undefined) {
    return <RenderBig/>
  } else  {
    return(<div style={style} className={className}>
      <RenderSmall/>
    </div>)
  }
}