import React, { Component } from 'react';
import {getCode, transformHex} from '../utils/colorTransforms';

// Each of the objects in here should be a @type {SassMeState}
const TESTS = [
  {
    hex: '019283',
    lighten: 12,
    saturate: 15,
    adjust_hue: 300
  },
  {
    hex: '482934',
    saturate: 52,
    adjust_hue: 345
  }
];


export default class SassTests extends Component {
  render() {
    return (
      <div id='sassTests'>
        <table>
          <thead>
            <tr>
              <th>
                Sass Func(s)
              </th>
              <th>
                JS Output
              </th>
              <th>
                Sass Output
              </th>
            </tr>
          </thead>
          <tbody>
            {TESTS.map((t, i) => {
              return (
                <tr key={i}>
                  <td>
                    {getCode(t)}
                  </td>
                  <td>
                    #{transformHex(t)}
                  </td>
                  <td>
                    <span className={`test-${t.hex}`} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
