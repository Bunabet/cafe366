/**
 * Fiche produit
 * SELECTION VARIANT
 * 2022-2022
 * v 0.1.1
 *
 */
// REACT
import * as React from "react";
import {useState} from "react";
// STYLE
import { options_wrapper, select_variant, select_title } from "./product_order_page.module.css";
// CAFE 366
import content from "../../../media/json/content.json";
import { content_by_lang } from "../../utils/misc";

function Content({name, content}) {
  return(
  <option value={content} key={`${name}-${content}`}>
      {content}
    </option>
    )
}


export function Selection({variants_is, options, change_option}) {
  const grind = useState(content_by_lang(content.info, "grind", ""));
  const quantity = useState(content_by_lang(content.info, "quantity", ""));
  return ( <fieldset className={options_wrapper}>
    {variants_is &&
      options.map(({ id, name, values }, index) => (
        <div>
          {index === 0 ? <div className={select_title}>{grind}</div> : <div className={select_title}>{quantity}</div>}
          <div className={select_variant} key={id}>
            <select
              aria-label="Variants"
              onChange={(event) => change_option(index, event)}
            >
              {/* <option value="">{`${select} ${name}`}</option> */}
              {values.map((value) => (
                <Content content={value} name={name}/>
              ))}
            </select>
          </div>
        </div>
      ))}
  </fieldset>)
}