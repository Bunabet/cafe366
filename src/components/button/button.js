/**
 * Collection of -E-GUI graphic element or not, like button picto, text link...
 * v 0.2.0
 * 2021-2021
 *
 * */
// REACT
import * as React from "react";
// gatsby
import { Link } from "gatsby";
import { navigate } from "gatsby";
// app
import { more_button } from "./button.module.css";

function NavTo({ to, src, alt }) {
  return (
    <Link to={to}>
      <img src={src} alt={alt} />
    </Link>
  );
}

function NavHref({ href, target, rel, src, alt }) {
  return (
    <a href={href} target={target} rel={rel}>
      <img src={src} alt={alt} />
    </a>
  );
}

function NavNo({ src, alt }) {
  return <img src={src} alt={alt} />;
}

export function Picto({
  src,
  alt,
  classNamePicto,
  stylePicto,
  classNameContainer,
  styleContainer,
  href,
  to,
}) {
  if (styleContainer === undefined && classNameContainer === undefined) {
    styleContainer = {
      width: "100%",
    };
  }

  if (stylePicto === undefined && classNamePicto === undefined) {
    stylePicto = {
      width: "100%",
    };
  }

  let nav_case = 0;
  if (to !== undefined) {
    nav_case = 1;
  } else if (href !== undefined) {
    nav_case = 2;
  }

  function switch_case() {
    switch (nav_case) {
      case 1:
        return <NavTo src={src} alt={alt} to={to} />;
      case 2:
        return (
          <NavHref
            src={src}
            alt={alt}
            href={href}
            target="_blank"
            rel="noreferrer"
          />
        );
      default:
        return <NavNo src={src} alt={alt} />;
    }
  }

  return (
    <div className={classNameContainer} style={styleContainer}>
      <div className={classNamePicto} style={stylePicto}>
        {switch_case()}
      </div>
    </div>
  );
}

export function MoreButton({ className, ...props }) {
  return <Link className={[className, more_button].join(" ")} {...props} />;
}

export function LinkPage({ className, style, where, children }) {
  const where_are_you_going = (event) => {
    event.preventDefault();
    if (typeof where === "string" || where instanceof String) {
      if (where === "/back") {
        navigate(-1);
      } else {
        navigate(where);
      }
    }
  };
  return (
    <div className={className} style={style} onClick={where_are_you_going}>
      {children}
    </div>
  );
}
