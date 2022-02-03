import * as React from "react"
// app
import { spinner } from "./progress.module.css"

export function Spinner(props) {
  return <span role="progressbar" className={spinner} {...props} />
}
