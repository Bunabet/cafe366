/**
 * Fiche produit
 * SELECTION VARIANT
 * v 0.0.1
 * 2022-2022
 *
 */
// REACT
import * as React from "react";
import {useState} from "react";
// STYLE
import {
  optionsWrapper,
  selectVariant,
} from "./product_page.module.css";
// CAFE 366
import content from "../../../../media/json/content.json";
import { content_by_lang } from "../../../utils/misc";


export function Selection({hasVariants, options, handleOptionChange}) {
  const [select, set_select] = useState(
    content_by_lang(content.info, "select", "")
  );

  return ( <fieldset className={optionsWrapper}>
    {hasVariants &&
      options.map(({ id, name, values }, index) => (
        <div className={selectVariant} key={id}>
          <select
            aria-label="Variants"
            onChange={(event) => handleOptionChange(index, event)}
          >
            <option value="">{`${select} ${name}`}</option>
            {values.map((value) => (
              <option value={value} key={`${name}-${value}`}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
  </fieldset>)
}