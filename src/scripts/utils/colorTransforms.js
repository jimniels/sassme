import {hex2hsl, hsl2hex} from './colorConversions';
import {isNil, reduce} from 'lodash';

/**
 * Transform HEX given a SassMeState object
 *
 * @param {SassMeState}
 * @return {String} - Hex color out
 */
export function transformHex(SassMeState) {
  const {hex, lighten, darken, saturate, desaturate, adjust_hue} = SassMeState;

  let hsl = hex2hsl(hex);

  if (!isNil(lighten)) {
    const newVal = hsl.l + lighten;
    if (newVal < 0) {
      hsl.l = 0;
    } else if (newVal > 100) {
      hsl.l = 100;
    } else {
      hsl.l = newVal;
    }
  }

  if (!isNil(darken)) {
    const newVal = hsl.l - darken;
    if (newVal < 0) {
      hsl.l = 0;
    } else if (newVal > 100) {
      hsl.l = 100;
    } else {
      hsl.l = newVal;
    }
  }

  if (!isNil(saturate)) {
    const newVal = hsl.s + saturate;
    if (newVal < 0) {
      hsl.s = 0;
    } else if (newVal > 100) {
      hsl.s = 100;
    } else {
      hsl.s = newVal;
    }
  }

  if (!isNil(desaturate)) {
    const newVal = hsl.s - desaturate;
    if (newVal < 0) {
      hsl.s = 0;
    } else if (newVal > 100) {
      hsl.s = 100;
    } else {
      hsl.s = newVal;
    }
  }

  if (!isNil(adjust_hue)) {
    const newVal = hsl.h + adjust_hue;
    if (newVal < -360) {
      hsl.h = newVal + 360;
    } else if (newVal > 360) {
      hsl.h = newVal - 360;
    } else {
      hsl.h = newVal;
    }
  }

  return hsl2hex(hsl);
}

/**
 * Get code of active Sass functions
 *
 * @param {SassMeState} - Object of key/value pairs indicating which sass funcs are active
 * @return {String} - Code for active sass funcs, i.e. `saturate(darken(#123456, 12), 12)`
 */
export function getCode(SassMeState) {
  const {hex} = SassMeState;

  let funcs = Object.keys(SassMeState).map(key => {
    if (key !== 'hex' && !isNil(SassMeState[key])) {
      return {
        [key]: SassMeState[key]
      }
    } else {
      return false;
    }
  }).filter(item => item ? true : false);

  return funcs.length > 0
    ? reduce(funcs, (accum, func) => {
        const key = Object.keys(func);
        return `${key}(${accum}, ${Math.round(func[key])})`;
      }, '#' + hex)
    : '';
}
