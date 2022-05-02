// REACT
import * as React from "react";
import { useState, useEffect } from "react"
// GATSBY SHOPIFY
import type { GatsbyBrowser } from 'gatsby';
import { StoreProvider } from "./src/context/context_store";
import "./src/css/reset.css";
import "./src/css/variables.css";
import "./src/css/global.css";
// CAFE 366
import { check_session } from "./src/utils/auth"

const SessionCheck = ({ children  } : any) => {
  const [loading, still_loading] = useState(true);
  useEffect(() => check_session(() => still_loading(false)));
  return <>{children}</>;
  // if(loading !== false) {
  //   return null;
  // } else {
  //   return <>{children}</>;
  // }
};

export const wrapRootElement : GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return (
    <StoreProvider>
      <SessionCheck>{element}</SessionCheck>
      {/* {element} */}
    </StoreProvider>)
};
