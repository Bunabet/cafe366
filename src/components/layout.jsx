import * as React from "react";
import { SkipNavContent, SkipNavLink } from "./skip_nav";
import { Header } from "./header";
import { Footer } from "./footer";
import { Seo } from "./seo";

export function Layout({ children }) {
  return (
    <div>
      <Seo />
      {/* A quoi sert SkipNavLink ????? */}
      {/* <SkipNavLink /> */}
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  );
}
