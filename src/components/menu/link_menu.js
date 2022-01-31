import React from "react";
import slugify from "@sindresorhus/slugify";
// GATSBY
import { Link } from "gatsby";
// CAFE 366
import { nav_link, active_link } from "./menu.module.css";


export default function LinkMenu({ id, path, title}) {
  return (
    <div>
      <Link
        key={id}
        className={nav_link}
        to={`${path}${slugify(id)}`}
        activeClassName={active_link}
      >
        {title}
      </Link>
    </div>
  );
}