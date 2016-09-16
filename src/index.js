import React from 'react';
import ReactDOM from 'react-dom';
import {isEmpty, startsWith} from 'lodash';
import App from './scripts/components/App';
import './index.css';

// @type {SassMeState}
const initialState = getQueryParams();

ReactDOM.render(
  <App {...initialState} />,
  document.getElementById('root')
);



/**
 * The query string can contain supported key/value in the URL which will set
 * the initial app state.
 *
 * The URL paramters will be parsed and added to the final SassMeState object
 * if they exist and fall within their respective thresholds.This populates the
 * intial state of <App />
 *
 * The SassMeState object type is used quite extensively throughout this app.
 * Learn it. Love it.
 *
 * @typedef {Object} SassMeState
 * @property {String} hex - Value, valid 6 character hexadecimal color
 * @property {number} lighten - Value [0 -> 100]
 * @property {number} darken - Value [0 -> 100]
 * @property {number} saturate - Value [0 -> 100]
 * @property {number} desaturate - Value [0 -> 100]
 * @property {number} adjust_hue - Value [-360 -> 360]
 */

/**
 * Get and validate the query params and return them as object key/value pairs
 *
 * @return {SassMeState} - An object of supported key/value pairs for the App
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
        // Remove any '#' and set the value IF it's valid, i.e. length of 6
        case 'hex':
          if (startsWith(value, '#')) {
            value = value.slice(1);
          }
          if (value.length === 6) {
            out.hex = decodeURIComponent(value);
          }
          break;
        // These all have the same threshold, So make sure they fall within in
        // and if they do, add them
        case 'lighten':
        case 'darken':
        case 'saturate':
        case 'desaturate':
          if (value >= 0 && value <= 100) {
            out[key] = Number(decodeURIComponent(value));
          }
          break;
        // Make sure it falls within our threshold, if so, add it
        case 'adjust_hue':
          if (value >= -360 && value <= 360) {
            out.adjust_hue = Number(decodeURIComponent(value));
          }
          break;
        default:
          break;
      }
    }
  });

  return out;
}
