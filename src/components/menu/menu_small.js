// REACT
import React, { useState, Fragment } from "react"
// CAFÉ 366
import MenuContent from "./menu_content"
import { nav_bar, toggle_menu, content_menu_small, hamburger, burger, hamburger_container  } from "./menu_small.module.css";
// UTILS
import { Get_window } from "../../utils/canvas"
/* inspired from
https://medium.com/javascript-in-plain-english/create-a-reusable-sidebar-component-with-react-d75cf48a053a 
https://www.youtube.com/watch?v=17g0QZXRfQk
*/
export const MenuSmallImpl = () => {
  let res = Get_window();
  // const [pos, set_pos] = useState(-width)
  const [height, set_height] = useState(0);
  const [width, set_width] = useState(res[0]/2);
  const [open, set_open] = useState(false);
  const [pos, set_pos] = useState(50);


  const toggleMenu = () => {
    set_open(!open);
    if(height > 0) set_height(0); else set_height(res[1]);
  }

  return (
    <Fragment>
      <div
        className={nav_bar}
        style={{
          minWidth: width,
        }}
      >
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
            <style jsx>{
            `
              .burger1{
                  transform: ${ open ? 'rotate(45deg)' : 'rotate(0)'};
              }
              .burger2{
                  opacity: ${ open ? 0 : 1};
              }
              .burger3{
                  transform: ${ open ? 'rotate(-45deg)' : 'rotate(0)'};
              }
            `}</style> 
          </div>
        </button>
        <div className={content_menu_small}>{open ? <MenuContent /> : <></> }</div>
        
      </div>
    </Fragment>
  )
}

export default function MenuSmall() {
  return (
    <MenuSmallImpl/>  
  )
}

