import * as React from "react";
// APP TEMPLATE
import { nav_link } from "./skip_nav.module.css";

const defaultId = `skip-to-content`;

export function SkipNavLink({
  children = `Skip to content`,
  contentId,
  ...props
}) {
  const id = contentId || defaultId;

  return (
    <a className={nav_link} {...props} href={`#${id}`} data-skip-to-content>
      {children}
    </a>
  );
}

/**
 * Wrap the main content of a page with this, thus also the <main> tag
 */
export function SkipNavContent({ children, id: idProp, ...props }) {
  const id = idProp || defaultId;

  return (
    <main {...props} id={id}>
      {children}
    </main>
  );
}
