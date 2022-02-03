/**
 *
 * Color utilities
 * v 0.2.2
 * 2021-2021
 *
 */

/**
 *
 * RGB convert from color number, like processing
 */
export function num_to_red(number_rgb) {
  let c = (number_rgb >> 16) & 0xff;
  return c;
}

export function num_to_green(number_rgb) {
  let c = (number_rgb >> 8) & 0xff;
  return c;
}

export function num_to_blue(number_rgb) {
  let c = number_rgb & 0xff;
  return c;
}

/**
 *
 * HSB convert from color number, like processing
 */

export function num_to_hue(number_rgb) {
  return num_to_hsb(number_rgb).hue;
}

export function num_to_saturation(number_rgb) {
  return num_to_hsb(number_rgb).sat;
}

export function num_to_brightness(number_rgb) {
  return num_to_hsb(number_rgb).bri;
}

// cenverter
export function num_to_rgb(number_rgb) {
  const obj = {
    red: num_to_red(number_rgb),
    green: num_to_green(number_rgb),
    blue: num_to_blue(number_rgb),
  };
  return obj;
}

export function num_to_hsb(number_rgb) {
  const r = num_to_red(number_rgb);
  const g = num_to_green(number_rgb);
  const b = num_to_blue(number_rgb);
  const hsb_arr = rgb_to_hsb(r, g, b);

  const obj = {
    hue: hsb_arr[0],
    sat: hsb_arr[1],
    bri: hsb_arr[2],
  };
  return obj;
}

export function hex_to_rgb(hex_rgb) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex_rgb = hex_rgb.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex_rgb);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

export function rgb_to_hsb(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0
      ? 0
      : n && v === r
      ? (g - b) / n
      : v === g
      ? 2 + (b - r) / n
      : 4 + (r - g) / n;
  const hue = 60 * (h < 0 ? h + 6 : h);
  const sat = v && (n / v) * 100;
  const bri = v * 100;
  // return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
  return [hue, sat, bri];
}

/**
 * convert data color to css filter
 * 2021-2021 v 0.2.0
 * * inspired from :
 * https://codepen.io/sosuke/pen/Pjoqqp
 * https://stackoverflow.com/a/43960991/604861
 *
 * need start from a black color
 */
export function css_hex_to_filter(hex_value) {
  const rgb = hex_to_rgb(hex_value);
  if (rgb.length !== 3) {
    alert("Invalid format, need to pass hexadecimal value");
    return;
  }
  const result = filter_solver(rgb[0], rgb[1], rgb[2]);
  if (result) {
    return result.filter_css;
  }
  return null;
}

export function css_rgb_to_filter(red, green, blue) {
  const result = filter_solver(red, green, blue);
  if (result) {
    return result.filter_css;
  }
  return null;
}

export function style_num_to_filter(number_rgb) {
  const color = num_to_rgb(number_rgb);
  const filter = data_rgb_to_filter(color.red, color.green, color.blue);
  return filter_to_string(filter);
}

export function style_rgb_to_filter(red, green, blue) {
  const filter = data_rgb_to_filter(red, green, blue);
  return filter_to_string(filter);
}

export function style_hex_to_filter(hex_value) {
  const filter = data_hex_to_filter(hex_value);
  return filter_to_string(filter);
}

export function data_rgb_to_filter(red, green, blue) {
  const result = filter_solver(red, green, blue);
  if (result) {
    return result.filter_data;
  }
  return null;
}

export function data_hex_to_filter(hex_value) {
  const rgb = hex_to_rgb(hex_value);
  if (rgb.length !== 3) {
    alert("Invalid format, need to pass hexadecimal value");
    return;
  }
  return data_rgb_to_filter(rgb[0], rgb[1], rgb[2]);
}

/**
 * INTERNAL FUNCTION
 * */
function filter_to_string(filter) {
  return (
    filter.invert +
    " " +
    filter.sepia +
    " " +
    filter.saturate +
    " " +
    filter.hue +
    " " +
    filter.brightness +
    " " +
    filter.contrast
  );
}

function filter_solver(red, green, blue) {
  if (!isNaN(red) && !isNaN(green) && !isNaN(blue)) {
    const color = new Color(red, green, blue);
    const solver = new Solver(color);
    const result = solver.solve();
    return result;
  }
  return null;
}

/**
 * CLASS COLOR
 */
class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }

  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(
      this.b
    )})`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = (angle / 180) * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.14,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(
      this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]
    );
    const newG = this.clamp(
      this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]
    );
    const newB = this.clamp(
      this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]
    );
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

/**
 * CLASS SOLVER
 */
class Solver {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter_css: this.css(result.values),
      filter_data: this.data(result.values),
    };
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = (lossDiff / (2 * ck)) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + (value % max);
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `filter: invert(${fmt(0)}%) 
                    sepia(${fmt(1)}%) 
                    saturate(${fmt(2)}%) 
                    hue-rotate(${fmt(3, 3.6)}deg) 
                    brightness(${fmt(4)}%) 
                    contrast(${fmt(5)}%);`;
  }

  data(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    let invert = `invert(${fmt(0)}%)`;
    let sepia = `sepia(${fmt(1)}%)`;
    let saturate = `saturate(${fmt(2)}%)`;
    let hue = `hue-rotate(${fmt(3, 3.6)}deg)`;
    let brightness = `brightness(${fmt(4)}%)`;
    let contrast = `contrast(${fmt(5)}%)`;

    return {
      invert,
      sepia,
      saturate,
      hue,
      brightness,
      contrast,
    };
  }
}
