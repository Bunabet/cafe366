/**
 * User BUTTON
 * 2022-2022
 * v 0.0.1
 */
// REACT
import * as React from "react";
// CAFE 366
import { User }  from "./../../icons/picto";

export function UserButton({ classNameContainer, classNamePicto }) {
  return (
    <div className={classNameContainer}>
      <User classNamePicto={classNamePicto}/>
    </div>
  );
}