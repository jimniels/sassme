/**
 * Color conversion functions are taken from SassMe 1.0 code
 * https://github.com/jimniels/sassme/releases/tag/1.0
 *
 * The HSL conversions were ported from mjackson's work based on a wikipedia entry:
 * https://gist.github.com/mjackson/5311256
 *
 * Types
 *
 * @typedef {Object} RGB
 * @property {number} r - Red [0 -> 255]
 * @property {number} g - Green [0 -> 255]
 * @property {number} b - Blue [0 -> 255]
 *
 * @typedef {Object} HSL
 * @property {number} h - Hue [-360 -> 360]
 * @property {number} s - Saturation [0 -> 100]
 * @property {number} l - Lightness [0 -> 100]
 */

/**
 * Convert HEX to RGB
 *
 * @param {String} - Hex color, `#` is optional
 * @return {RGB}
 */
export function hex2rgb(hex) {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }
  return {
    r: parseInt(hex.charAt(0) + '' + hex.charAt(1), 16),
    g: parseInt(hex.charAt(2) + '' + hex.charAt(3), 16),
    b: parseInt(hex.charAt(4) + '' + hex.charAt(5), 16)
  };
};

/**
 * Convert RGB to HEX
 * http://stackoverflow.com/a/5623914/12799
 *
 * @param {RGB}
 * @return {String} - Hex color sans '#'
 */
export function rgb2hex(rgb) {
  return ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
};

/**
 * Convert RGB to HSL
 *
 * @param {RGB}
 * @return {HSL}
 */
export function rgb2hsl(rgb) {
  let {r, g, b} = rgb;
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h;
  switch (max) {
    case min:
      h = 0;
      break;
    case r:
      h = 60 * (g - b) / d;
      break;
    case g:
      h = 60 * (b - r) / d + 120;
      break;
    case b:
      h = 60 * (r - g) / d + 240;
      break;
    default:
      break;
  }

  if (h < 0) {
    h = 360 + h;
  }
  const l = (max + min) / 2.0;
  const s = max === min
    ? 0
    : l < 0.5
      ? d / (2 * l)
      : d / (2 - 2 * l);

  return {
    h: Math.abs((h % 360).toFixed(5)),
    s: Number((s * 100).toFixed(5)),
    l: Number((l * 100).toFixed(5))
  };
};

/**
 * HSL to RGB
 *
 * @param {HSL}
 * @return {RGB}
 */
export function hsl2rgb(hsl) {
  let {h,s,l} = hsl;
  let r, g, b = undefined;

  h = parseFloat(h).toFixed(5) / 360;
  s = parseFloat(s).toFixed(5) / 100;
  l = parseFloat(l).toFixed(5) / 100;

  if (s === 0) {
    r = g = b = l;
  } else {
    let p, q = undefined;

    q = l < 0.5
      ? l * (1 + s)
      : l + s - l * s;
    p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

/**
 * Hue to RGB
 * Convenience method for hsl2rgb
 *
 * @param {number} p
 * @param {number} q
 * @param {number} t
 * @return {number}
 */
export function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
};

/**
 * HEX to HSL convenience function that does HEX -> RGB -> HSL
 */
export function hex2hsl(hex) {
  return rgb2hsl(hex2rgb(hex));
}

/**
 * HSL to HEX convenience function that does HSL -> RGB -> HEX
 */
export function hsl2hex(hsl) {
  return rgb2hex(hsl2rgb(hsl));
}
