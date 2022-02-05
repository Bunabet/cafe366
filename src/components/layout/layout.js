import * as React from "react";
import {useContext } from "react";
import { SkipNavContent, SkipNavLink } from "./skip_nav";
import { ProviderMenu, ContextMenu } from "../../context/context_menu";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Seo } from "../seo";

export function Layout({ children }) {
  const { menu_small_is } = useContext(ContextMenu);
  return (
    <div>
      <Seo />
      {/* A quoi sert SkipNavLink ????? */}
      {/* <SkipNavLink /> */}
      <ProviderMenu>
        <Header />
        {/* {!menu_small_is ? <SkipNavContent>{children}</SkipNavContent> : null} */}
        <SkipNavContent>{children}</SkipNavContent> 
        <Footer />
      </ProviderMenu>
    </div>
  );
}
