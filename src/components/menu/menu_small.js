// REACT
import React, { useState, Fragment } from "react"
// CAFÉ 366
import MenuContent from "./menu_content"
import {  nav_bar, toggle_menu, content_menu_small, 
          hamburger, burger, hamburger_container,
          show, hidden } from "./menu_small.module.css";
// UTILS
import { Get_window } from "../../utils/canvas"
/* inspired from
https://medium.com/javascript-in-plain-english/create-a-reusable-sidebar-component-with-react-d75cf48a053a 
https://www.youtube.com/watch?v=17g0QZXRfQk
*/
export const MenuSmallImpl = () => {
  const [open, set_open] = useState(false);

  const toggleMenu = () => {
    set_open(!open);
  }

  return (
    <Fragment>
      <div style={{textAlign:`center`}}>
        <button
          onClick={() => toggleMenu()}
          className={toggle_menu}
        >
          {/* inspired from https://github.com/aru120/hamburgerNav-demo/blob/main/components/Hamburger.js */}
          <div className={hamburger_container}>
            <div className={hamburger}>
              <div className={[burger, "burger1"].join(" ")} />
              <div className={[burger, "burger2"].join(" ")} />
              <div className={[burger, "burger3"].join(" ")} />
            </div>
            <style>{`
              .burger1 {
                  transform: ${ open ? 'rotate(45deg)' : 'rotate(0)'};
              }
              .burger2 {
                  opacity: ${ open ? 0 : 1};
              }
              .burger3 {
                  transform: ${ open ? 'rotate(-45deg)' : 'rotate(0)'};
              }
            `}</style> 
          </div>
        </button>
      </div>
      <div className={[nav_bar, "move"].join(" ")}>
        {/* <div>{open ? <div className={show}><MenuContent /></div> : <div className={hidden}><MenuContent /></div> }</div> */}
        <MenuContent />
      </div>
      <style>{`
          .move {
            transform: ${open ? 'translatey(0)' : 'translatey(-400px)'};
          }
        `}</style> 
    </Fragment>
  )
}

export default function MenuSmall() {
  return (
    <MenuSmallImpl/>  
  )
}

