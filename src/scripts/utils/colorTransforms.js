import {hex2rgb, rgb2hsl, hsl2rgb, rgb2hex} from './colorConversions';

/**
 * Lighten a hex color
 *
 * @param {String} hex
 * @param {number} percentage - Number limited to range of 0-100 (inclusive)
 * @return {String} hex - Hex value after lightness was modified based on percentage
 */
export function lighten(hex, percentage) {
  const hsl = rgb2hsl(hex2rgb(hex));
  hsl.l = normalizeRange(percentage, 0, 100);
  return rgb2hex(hsl2rgb(hsl));
}

/**
 * Saturate a hex color
 *
 * @param {String} hex
 * @param {number} percentage - Number limited to range of 0-100 (inclusive)
 * @return {String} hex - Hex value after saturation was modified based on percentage
 */
export function saturate(hex, percentage) {
  const hsl = rgb2hsl(hex2rgb(hex));
  hsl.s = normalizeRange(percentage, 0, 100);
  return rgb2hex(hsl2rgb(hsl));
}

export function adjustHue(hex, degree) {
  const hsl = rgb2hsl(hex2rgb(hex));
  hsl.h = normalizeRange(degree, 0, 360);
  return rgb2hex(hsl2rgb(hsl));
}

/**
 * Normalize value according to a given range
 *
 * @param  {number} value - The value we're testing to see if it's in a range
 * @param  {number} limitLow - The low-end limit
 * @param  {number} limitHigh - The high-end limit
 * @return {number} - Normalized value
 */
function normalizeRange(value, limitLow, limitHigh) {
  if (value < limitLow) {
    value = limitLow;
  }
  if (value > limitHigh) {
    value = limitHigh;
  }
  return value;
}
