// REACT
import * as React from "react";
// GATSBY SHOPIFY
import { StoreProvider } from "./src/context/context_store";
import "./src/css/reset.css";
import "./src/css/variables.css";
import "./src/css/global.css";

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);
