/**
 * HEADER
 * 2021-2022
 * v 0.1.1
 */
// REACT
import * as React from "react";
import { useContext } from "react";
// GATSBY

// GATSBY SHOPIFY STARTER
import { ContextStore } from "../../context/context_store";
// CAFE 366
import { Menu } from "./../menu/menu";

import {  header, container, 
          picto,
          logo_long_container, logo_square_container, 
          cart_container, 
          user_container } from "./header.module.css";
import "./header.module.css";


import { Select, SelectAnimation } from "./select";

import { CartButton } from "./../cart/cart_button";
// import { UserButton } from "./../button/user_button";
// import SearchIcon from "./../../icons/search";

// CAFE 366
import { LogoLong, LogoSquare } from "./../../icons/picto";

import { Window_is_big } from "../../utils/canvas";


export function Header() {
  const { checkout, loading, did_just_add_to_cart } =
    useContext(ContextStore);

  // quantity of item must be display in the cart icon
  const items = checkout ? checkout.lineItems : [];
  const quantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  /**
   *  Deal with SSR Gatsby rendering problem with class Object need to pass by useState, useEffect
   *  https://blog.logrocket.com/using-localstorage-react-hooks/
   *  https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
   */

    {/* <Link to="/search" className={searchButton}>
    <SearchIcon />
  </Link> */}

  return (
    <>
      <div className={container}>
        {/* barre de navigation */}
        <header className={header}>
          <Logo/>
          <Menu/>
          <CartButton quantity={quantity} classNameContainer={cart_container} classNamePicto={picto}/>
        </header>
        <Select show={loading || did_just_add_to_cart} >
          <SelectAnimation  just_add={did_just_add_to_cart}/>
        </Select>
      </div>
    </>
  );
}


function Logo() {
  if(Window_is_big(600)) {
    return(<LogoLong classNameContainer={logo_long_container}/>)
  } else {
    return(<LogoSquare classNameContainer={logo_square_container}/>)
  }
}
