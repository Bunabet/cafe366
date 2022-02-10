import React from "react";
import { container_test, 
          bloc_a, bloc_b, bloc_c 
} from "./test.module.css";

export function Test() {
  return (
    <div>
      <div className={bloc_a}>derrière la montagne</div>
      <div className={bloc_b}>à l'abris du soleil et du vent</div>
      <div className={bloc_c}>pour se rapprocher des étoiles et du ciel</div>
  </div>)
}

// export function Test() {
//   return (
//     <div className={container_test}>
//       <div className={bloc_a}>derrière la montagne</div>
//       <div className={bloc_b}>à l'abris du soleil et du vent</div>
//       <div className={bloc_c}>pour se rapprocher des étoiles et du ciel</div>
//   </div>)
// }