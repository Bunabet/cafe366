// REACT
import React from "react";
import { Fragment, useContext } from "react";
// import {useState, useEffect} from "react";
// CAFÉ 366
import { ContextMenu } from "../../context/context_menu";

import MenuContent from "./menu_content"
import {  toggle_menu, 
          menu_display, menu_display_open, 
          offset_text,
          hamburger, burger, hamburger_container,
        } from "./menu_small.module.css";
// UTILS
// import { Get_window } from "../../utils/canvas"
/* inspired from
* https://github.com/aru120/hamburgerNav-demo/blob/main/components/Hamburger.js
* https://ramonak.io/posts/react-context-api-update-from-nested-component
*/

export const DisplayMenuSmall = () => {
  const { menu_small_is } = useContext(ContextMenu);

  const style_menu_close = [menu_display].join(" ");
  const style_menu_open = [menu_display, menu_display_open].join(" ");

  return(
    <div>
      <div>{  menu_small_is ? 
              (<div className={style_menu_open}><MenuContent className={offset_text}/></div>) :
              (<div className={style_menu_close}><MenuContent className={offset_text}/></div>)
            }</div>
    </div>
  )
}

const ToggleMenuSmall = () => {
  const { menu_small_is, swap_menu_small } = useContext(ContextMenu);
  return (
    <button className={toggle_menu} onClick={swap_menu_small}>
      <div className={hamburger_container}>
        <div className={hamburger}>
          <div className={[burger, "burger1"].join(" ")} />
          <div className={[burger, "burger2"].join(" ")} />
          <div className={[burger, "burger3"].join(" ")} />
        </div>
        <style>{`
          .burger1 {
              transform: ${ menu_small_is ? 'rotate(45deg)' : 'rotate(0)'};
          }
          .burger2 {
              opacity: ${ menu_small_is ? 0 : 1};
          }
          .burger3 {
              transform: ${ menu_small_is ? 'rotate(-45deg)' : 'rotate(0)'};
          }
        `}</style> 
      </div>
    </button>
  );
};

export const MenuSmallImpl = () => {
  return (
    <Fragment>
      <div style={{textAlign:`center`}}>
        <ToggleMenuSmall/>
      </div>
    </Fragment>
  )
}

export default function MenuSmall() {
  return (
    <MenuSmallImpl/>  
  )
}



