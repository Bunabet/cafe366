import * as React from "react";
import { useContext } from "react";
// CAFE 366
import { SkipNavContent, SkipNavLink } from "./skip_nav";
import { ProviderMenu, ContextMenu } from "../../context/context_menu";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Seo } from "../seo";
import { DisplayMenuSmall } from "./../menu/menu_small";

function DisplayContent({ children }) {
  const { menu_small_is } = useContext(ContextMenu);
  return (<>{!menu_small_is ? <>
                                <SkipNavContent>{children}</SkipNavContent>
                                <Footer/>
                              </> : null}</>)
}

export function Layout({ children }) {


  return (
    <div>
      <Seo />
      {/* A quoi sert SkipNavLink ????? */}
      {/* <SkipNavLink /> */}
      <ProviderMenu>
          <Header/>
          {/* WHY I MUST PASS BY style NOT BY className ???? */}
          <div style={{transform: 'translateY(75px)'}}>
            <DisplayMenuSmall/>
            <DisplayContent>{children}</DisplayContent>
          </div>
      </ProviderMenu>
    </div>
  );
}
