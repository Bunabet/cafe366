
import { useEffect } from "react";
/**
 * UTILS MISC
 * v 0.2.1
 * 2021-2021
 * */

// constants
export function SetConstants(r, brownser_is) {
  useEffect(() => {
    if (brownser_is) {
      localStorage.setItem("constants", JSON.stringify(r));
    }
  }, ["constants", r]);
}

export function get_constants() {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    const constants = localStorage.getItem("constants");
    return constants !== null ? JSON.parse(constants) : "";
  }
  return "";
}

// language
export function get_lang() {
  const brownser_is = typeof window !== "undefined";
  let lang = "fr";
  if (brownser_is) {
    lang = localStorage.getItem("lang");
  }
  return lang;
}

export function find_lang(arr, target, lang) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === target) {
      if (lang === "en") return arr[i].label_en;
      else return arr[i].label_fr;
    }
  }
  return null;
}

export function content_by_lang(content_arr, what, nothing_match) {
  if (get_lang() === "fr") {
    return find_lang(content_arr, what, "fr");
  } else if (get_lang() === "en") {
    return find_lang(content_arr, what, "en");
  }
  return nothing_match;
}

// String conversion
export function str_unit_to_number(unit, str) {
  str = str.replace(unit, "");
  if (!isNaN(str)) {
    let res = Number(str);
    return res;
  } else return null;
}
