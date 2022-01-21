// REACT
import * as React from "react";
import { useState } from "react";
// GATSBY
import { navigate } from "gatsby";
// GATSBY SHOPIFY STARTER
import {
  footer,
  className_copyright,
  identity,
  picto_container,
  link_page,
} from "./footer.module.css";
// APP
import { get_constants } from "./../../utils/misc";
import { style_num_to_filter } from "./../../utils/color";
import { Picto, LinkPage } from "./../../components/button/button";

// CAFE 366
import content from "./../../../media/json/content.json";
import { content_by_lang } from "./../../utils/misc";
import picto_facebook from "./../../../media/picto/facebook_2021.svg";
import picto_instagram from "./../../../media/picto/instagram_2016.svg";
import logo_366 from "./../../../media/logo/cafe366_logo_noir.svg";

export function Footer() {
  const [legal_info, set_legal_info] = useState(
    content_by_lang(content.info, "legal info", "")
  );
  const [copyright, set_copyright] = useState(
    content_by_lang(content.info, "copyright", "")
  );
  /**
   *  Deal with SSR Gatsby rendering problem with class Object need to pass by useState, useEffect
   *  https://blog.logrocket.com/using-localstorage-react-hooks/
   *  https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
   */
  const [r, set_r] = useState(get_constants());

  const style_filter_data = style_num_to_filter(r.LIN);
  const picto_style = {
    position: "relative",
    margin: "auto",
    // vertical displacement depend of the height of the container
    // top: "17%",
    width: "25px",
    height: "25px",

    filter: style_filter_data,
  };

  return (
    <footer className={footer}>
      <div className={identity}>
        <Picto src={logo_366} stylePicto={picto_style} />
        <div className={className_copyright}>
          Copyright &copy; {new Date().getFullYear()} · {copyright}
        </div>
      </div>
      <Picto
        src={picto_facebook}
        stylePicto={picto_style}
        classNameContainer={picto_container}
        alt="facebook"
        href="https://www.facebook.com/Cafe366torrefaction"
      />
      <Picto
        src={picto_instagram}
        stylePicto={picto_style}
        classNameContainer={picto_container}
        alt="facebook"
        href="https://www.instagram.com/cafe366/"
      />
      <LinkPage className={link_page} where="/legal/legal">
        {legal_info}
      </LinkPage>
    </footer>
  );
}
