import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
// app
import { select_wrapper, hiding, showing, animation } from "./select.module.css";
// cafe 366
import { Picto } from "./../../components/button/button";
import tick from "./../../../media/picto/tick_blanc.svg";
import content from "./../../../media/json/content.json";
import { content_by_lang } from "./../../utils/misc";

export function Select({ show, duration = 1000, className, ...props }) {
  const [visible, setVisible] = useState(show);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (show) {
      setVisible(true);
    }
    const timeout = setTimeout(() => {
      setAnimation("")
      setVisible(show)
    }, duration)
    setAnimation(show ? showing : hiding)
    return () => clearTimeout(timeout)
  }, [show, duration]);


  return visible ? (
    <div
      className={[select_wrapper, animation, className].join(" ")}
      {...props}
    />
  ) : null
}

// added
// update
export function SelectAnimation({just_add}) {
	const style = {
    margin: "0 auto",
    width: "25px",
    height: "25px",
  };

	const added = useState(content_by_lang(content.info, "added", ""));
  const updated = useState(content_by_lang(content.info, "update", ""));

		// the code is not really clear for me here, between javascript and jsx
	return (<div className={animation}>{!just_add ? (
		updated
	) : (
		<>
			{added}
			<Picto src={tick}  stylePicto={style} alt="ok"/>
		</>
	)}</div>)
}
