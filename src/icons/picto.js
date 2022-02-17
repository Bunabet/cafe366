import * as React from "react";

// CAFE 366
import { Picto } from "./../components/button/button";

// logo
import logo_366 from "./../../media/logo/cafe366_logo_blanc.svg";
import instagram from "./../../media/logo/instagram_2016_blanc.svg";
import facebook from "./../../media/logo/facebook_2021_blanc.svg";
//picto
import panier from "./../../media/picto/panier_blanc.svg";
import tick from "./../../media/picto/tick.svg";


export function Panier({classNameContainer}) {
  return(<Picto src={panier} alt="panier" to="/cart" classNameContainer={classNameContainer}/>)
}

export function Logo({classNameContainer}) {
  return (<Picto src={logo_366} alt="café 366" to="/" classNameContainer={classNameContainer}/>)
}

export function Facebook({style, classNameContainer}) {
  return(<Picto src={facebook} alt="facebook" href="https://www.facebook.com/Cafe366torrefaction" stylePicto={style} classNameContainer={classNameContainer}/>)
}

export function Instagram({style, classNameContainer}) {
  return(<Picto src={instagram} alt="instagram"  href="https://www.instagram.com/cafe366/" stylePicto={style} classNameContainer={classNameContainer}/>)
}

export function Tick({classNameContainer}) {
  return(<Picto src={tick} alt="tick" to="/" classNameContainer={classNameContainer}/>)
}