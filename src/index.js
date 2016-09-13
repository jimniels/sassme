import React from 'react';
import ReactDOM from 'react-dom';
import {isEmpty, startsWith} from 'lodash';
import App from './scripts/components/App';
import './index.css';

// @type {QueryParams}
const initialState = getQueryParams();

ReactDOM.render(
  <App {...initialState} />,
  document.getElementById('root')
);



/**
 * QueryString consists of the key value pairs coming from the URL. The following
 * keys will be considered:
 *
 *   hex - Hexadecimal number without the '#' (though will parse with)
 *   lighten - Value for sass function `lighten()`, supported range: [0 -> 100]
 *   darken - Value for sass function `darken()`, supported range: [0 -> 100]
 *   saturate - Value for sass function `saturate()`, supported range: [0 -> 100]
 *   desatruate - Value for sass function `desatruate()`, supported range: [0 -> 100]
 *   adjustHue - Value for sass function `adjust-hue()`, supported range: [-360 -> 360]
 *
 * These are then parsed and added to the final QueryParams object if values
 * exist and fall within the requirements/threshold for each value.
 *
 * @typedef {QueryParams}
 * @property {String} hex
 *   Hexadecimal number without the '#' (though will parse with)
 * @property {number} lightness
 *   Initial state value, combines `lighten` and `darken` from QueryString.
 *   Supported range: [-100 -> 100]
 * @property {number} saturation
 *   Initial state value, combines `saturate` and `desaturate` from QueryString.
 *   Supported range: [0 -> 100]
 * @property {number} hue -
 *   Initial state value, matches `adjustHue` from QueryString.
 *   Supported range: [-360 -> 360]
 */

/**
 * Get and validate the query params and return them as object key/value pairs
 *
 * @return {QueryParams} - An object of supported key/value pairs for the App
 */
function getQueryParams() {
  const query = window.location.search.substring(1); // remove the '?'

  if (!query) {
    return {};
  }

  let out = {};

  query.split('&').forEach(params => {
    let [key, value] = params.split('=');

    // Only populate the object if it's a supported key
    if (!isEmpty(key) && !isEmpty(value)) {
      switch (key) {
        case 'hex':
          // Remove any '#' and set the value IF it's valid, i.e. length of 6
          if (startsWith(value, '#')) {
            value = value.slice(1);
          }
          if (value.length === 6) {
            out.hex = decodeURIComponent(value);
          }
          break;
        case 'lighten':
          // Make sure it falls within our threshold, add it to current `lightness` value
          if (value >= 0 && value <= 100) {
            const {lightness=0} = out;
            out.lightness = lightness + Number(decodeURIComponent(value));
          }
          break;
        case 'darken':
          // Make sure it falls within our threshold, subtract it from current `lightness` value
          if (value >= 0 && value <= 100) {
            const {lightness=0} = out;
            out.lightness = lightness - Number(decodeURIComponent(value));
          }
          break;
        case 'saturate':
          // Make sure it falls within our threshold, add it to current `lightness` value
          if (value >= 0 && value <= 100) {
            const {saturation=0} = out;
            out.saturation = saturation + Number(decodeURIComponent(value));
          }
          break;
        case 'desaturate':
          // Make sure it falls within our threshold, subtract it from current `lightness` value
          if (value >= 0 && value <= 100) {
            const {saturation=0} = out;
            out.saturation = saturation - Number(decodeURIComponent(value));
          }
          break;
        case 'adjustHue':
          // Make sure it falls within our threshold, subtract it from current `lightness` value
          if (value >= 360 && value <= -360) {
            const {hue=0} = out;
            out.hue = hue + Number(decodeURIComponent(value));
          }
          break;
        default:
          break;
      }
    }
  });

  return out;
}
