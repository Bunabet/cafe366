/**
 * PICTO
 * v 0.1.1
 * 2021-2022
 * */
import * as React from "react";

// CAFE 366
import { Picto } from "./../components/button/button";

// logo
import logo_366_square from "./../../media/logo/cafe366_logo_blanc_square.svg";
import logo_366_long from "./../../media/logo/cafe366_logo_blanc_long.svg";

import instagram from "./../../media/logo/instagram_2016_blanc.svg";
import facebook from "./../../media/logo/facebook_2021_blanc.svg";
//picto
import user from "./../../media/picto/utilisateur_blanc.svg";
import panier from "./../../media/picto/panier_blanc.svg";
import tick from "./../../media/picto/tick.svg";


export function Panier({styleContainer, classNameContainer, classNamePicto}) {
  return(<Picto src={panier} alt="panier" to="/cart" styleContainer={styleContainer} classNameContainer={classNameContainer} classNamePicto={classNamePicto}/>)
}

export function LogoLong({styleContainer, classNameContainer}) {
  return (<Picto src={logo_366_long} alt="café 366" to="/" styleContainer={styleContainer} classNameContainer={classNameContainer}/>)
}

export function LogoSquare({styleContainer, classNameContainer}) {
  return (<Picto src={logo_366_square} alt="café 366" to="/" styleContainer={styleContainer} classNameContainer={classNameContainer}/>)
}

export function User({styleContainer, classNameContainer}) {
  return (<Picto src={user} alt="user" to="/user/account" styleContainer={styleContainer} classNameContainer={classNameContainer}/>)
}

export function Facebook({style, classNameContainer}) {
  return(<Picto src={facebook} alt="facebook" href="https://www.facebook.com/Cafe366torrefaction" stylePicto={style} classNameContainer={classNameContainer}/>)
}

export function Instagram({style, classNameContainer}) {
  return(<Picto src={instagram} alt="instagram" href="https://www.instagram.com/cafe366/" stylePicto={style} classNameContainer={classNameContainer}/>)
}

export function Tick({classNameContainer}) {
  return(<Picto src={tick} alt="tick" to="/" classNameContainer={classNameContainer}/>)
}