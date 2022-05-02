// REACT
import * as React from "react";
import { useContext } from "react";
// GATSBY SHOPYFY STARTER
import { nav_style } from "./menu.module.css";
import { menu_big, menu_small } from "../header/header.module.css";
// CAFÉ 366
import MenuSmall from "./menu_small";
import MenuContent from "./menu_content";
import { ContextMenu } from "../../context/context_menu";
// UTILS
import { Get_width } from "../../utils/canvas";

/**
 * https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/
 * https://youtu.be/58OD42jyF4o?t=1753 at this moment talk about createpage but not sure
 */



export function Menu() {
  const { switch_off_menu_small } = useContext(ContextMenu);

  if(Get_width() >= 640) {
    switch_off_menu_small();
    return (
      <nav className={[nav_style, menu_big].join(" ")}>
        <MenuContent/> 
      </nav>
    );
  } else {
    return (
      <div className={menu_small}>
        <MenuSmall/>
      </div>
    )
  } 
}

