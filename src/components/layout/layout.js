import * as React from "react";
import {useContext } from "react";
// CAFE 366
import { SkipNavContent, SkipNavLink } from "./skip_nav";
import { ProviderMenu } from "../../context/context_menu";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Seo } from "../seo";
import { DisplayMenuSmall } from "./../menu/menu_small";

export function Layout({ children }) {
  return (
    <div>
      <Seo />
      {/* A quoi sert SkipNavLink ????? */}
      {/* <SkipNavLink /> */}
      <ProviderMenu>
          <Header />
          {/* WHY I MUST PASS BY style NOT BY className ???? */}
          <div style={{transform: 'translateY(75px)'}}>
          <DisplayMenuSmall/>
          <SkipNavContent>{children}</SkipNavContent> 
          <Footer />
          </div>
      </ProviderMenu>
    </div>
  );
}
