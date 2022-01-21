// REACT
import * as React from "react";
// GATSBY SHOPIFY
import { StoreProvider } from "./src/context/store_context";
import "./src/css/reset.css";
import "./src/css/variables.css";
import "./src/css/global.css";

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);
