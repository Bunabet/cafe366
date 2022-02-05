// REACT
import React from "react";
import { useState, Fragment, useContext } from "react";
import {useEffect, createRef } from "react";
// CAFÉ 366
// import { ContextMenu } from "../../context/context_menu";
import { ContextMenu, ProviderMenu } from "../../context/context_menu";

import MenuContent from "./menu_content"
import {  toggle_menu, 
          menu,  
          hamburger, burger, hamburger_container
        } from "./menu_small.module.css";
// UTILS
// import { Get_window } from "../../utils/canvas"
/* inspired from
* https://github.com/aru120/hamburgerNav-demo/blob/main/components/Hamburger.js
* https://ramonak.io/posts/react-context-api-update-from-nested-component
*/

export const DisplayMenuSmall = () => {
  const { menu_small_is } = useContext(ContextMenu);

  return(
    <div>
      <div>{  menu_small_is ? 
              // (<div className={[menu, "move"].join(" ")}><MenuContent /></div>) : null
              (<div className={[menu, "move"].join(" ")}><MenuContent /></div>) :
              (<div className={[menu, "move"].join(" ")}><MenuContent /></div>)
            }</div>
      <style>{`
      .move {
        transform: ${menu_small_is ? 'translatey(0)' : 'translatey(-400px)'};
      }
      `}</style>     
    </div>
  )
}

const ToggleMenuSmall = () => {
  const { menu_small_is, set_open_menu_small } = useContext(ContextMenu);
  return (
    <button className={toggle_menu} onClick={set_open_menu_small}>
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

