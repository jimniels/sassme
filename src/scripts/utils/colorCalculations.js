import {rgb2hsl, hex2rgb} from './colorConversions';

export function calculateLightness(hex) {
  return rgb2hsl(hex2rgb(hex)).l;
}

export function calculateSaturation(hex) {
  return rgb2hsl(hex2rgb(hex)).s;
}
