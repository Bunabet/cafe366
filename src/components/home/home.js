// REACT
import * as React from "react";
// gatsby
import { useStaticQuery, graphql } from "gatsby";
// CAFE 366
import { container, intro } from "./home.module.css";

export function Introduction() {
  // need to pass to tag sorting for the futur to remove type :
  const data = useStaticQuery(
    graphql`
      query {
        contentfulAccueil(langue: {eq: "fr"}) {
          titre
        }
      }
    `
  );

  // for the futur create an extarnal component for the language
  // const lang = get_lang();

  const txt_intro = data.contentfulAccueil.titre;


  return (
    <div className={container}>
      <h1 className={intro}>{txt_intro}</h1>
    </div>
  );
}