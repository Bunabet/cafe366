import { useState, useRef, useLayoutEffect } from "react"

export function set_canvas(canvas) {
  // need that to pass gatsby build
  if (typeof window !== `undefined`) {
    canvas[0] = window.innerWidth
    canvas[1] = window.innerHeight
  }
}

export function Get_window() {
  let canvas = [0, 0]
  set_canvas(canvas)

  const [size, set_size] = useState(canvas)
  useRef(size)

  useLayoutEffect(() => {
    function window_resize(event) {
      set_canvas(canvas)
      set_size(canvas[0], canvas[1])
    }
    window.addEventListener("resize", window_resize)
    return () => {
      window.removeEventListener("resize", window_resize)
    }
  }, [canvas])
  return canvas
}
