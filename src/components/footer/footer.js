// REACT
import * as React from "react";
import { useState } from "react";
// GATSBY
import { navigate } from "gatsby";
// GATSBY SHOPIFY STARTER
import {
  container,
  footer,
  className_copyright,
  resosocio,
  picto_resosocio_container,
  link_page,
} from "./footer.module.css";
// APP
import { LinkPage } from "./../../components/button/button";

// CAFE 366
import content from "./../../../media/json/content.json";
import { content_by_lang } from "./../../utils/misc";

import { Facebook, Instagram }  from "./../../icons/picto";


export function Footer() {
  const [legal_info, set_legal_info] = useState(
    content_by_lang(content.info, "legal info", "")
  );

  const [cgv, set_cgv] = useState(
    content_by_lang(content.info, "cgv", "")
  );

  const [copyright, set_copyright] = useState(
    content_by_lang(content.info, "copyright", "")
  );
  /**
   *  Deal with SSR Gatsby rendering problem with class Object need to pass by useState, useEffect
   *  https://blog.logrocket.com/using-localstorage-react-hooks/
   *  https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
   */

  const resosocio_style = {
    margin: "0 auto",
    width: "25px",
    height: "25px",
  };


  return (
    <div className={container}>
      <footer className={footer}>
        <div className={className_copyright}>
          Copyright &copy; Buna Bet / Café 366  2016-{new Date().getFullYear()} {copyright}
        </div>
        <div className={resosocio}>
          <Facebook style={resosocio_style} classNameContainer={picto_resosocio_container}/>
          <Instagram style={resosocio_style} classNameContainer={picto_resosocio_container}/>
        </div>
        
        <div className={link_page}>
          <LinkPage where="/legal/legal">
            {legal_info}
          </LinkPage>
          <div><pre> | </pre></div>
          <LinkPage where="/legal/cgv">
            {cgv}
          </LinkPage>
        </div>  
      </footer>
    </div>
  );
}
