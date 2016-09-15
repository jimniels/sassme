import React, {Component} from 'react';
import {isNil, toString} from 'lodash';
import {getCode, transformHex} from '../utils/colorTransforms';
import Header from './Header';
import SassTests from './SassTests';

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initial state populated by props. Otherwise, `getDefaultState` is used.
    this.state = {
      ...props
    };
  }

  handleHexInput = (e) => {
    // Strip out non-hexadecimal values
    let input = e.target.value.match(/[0-9A-Fa-f]/g);
    input = input ? input.join('') : '';

    // Set the input and reset the sliders
    this.setState({
      hex: input,
      lighten: undefined,
      darken: undefined,
      saturate: undefined,
      desaturate: undefined,
      adjust_hue: undefined
    });
  }

  handleInputSlider = (stateKey, e) => {
    const input = Number(e.target.value);

    let newState = {};
    if (stateKey === 'lighten') {
      if (input < 0) {
        newState.darken = Math.abs(input);
        newState.lighten = undefined;
      } else {
        newState.lighten = input
        newState.darken = undefined;
      }
    } else if (stateKey === 'saturate') {
      if (input < 0) {
        newState.desaturate = Math.abs(input);
        newState.saturate = undefined;
      } else {
        newState.saturate = input
        newState.desaturate = undefined;
      }
    } else if (stateKey === 'adjust_hue') {
      newState.adjust_hue = input;
    }

    this.setState(newState);
  }

  handleResetInputSlider = (stateKey, e) => {
    e.preventDefault();
    let newState = {};
    if (stateKey === 'lighten') {
      newState.lighten = undefined;
      newState.darken = undefined;
    } else if (stateKey === 'saturate') {
      newState.saturate = undefined;
      newState.desatruate = undefined;
    } else if (stateKey === 'adjust_hue') {
      newState.adjust_hue = undefined;
    }

    this.setState(newState);
  }

  handleCopyInputValue = (e) => {
    const val = e.target.value;
    e.target.setSelectionRange(0, val.length);
  }

  render() {
    const {hex, lighten, darken, saturate, desaturate, adjust_hue} = this.state;

    const hexIsValid = hex.length === 6;

    const hexOutput = hexIsValid
      ? transformHex({
          hex,
          lighten,
          darken,
          saturate,
          desaturate,
          adjust_hue
        })
      : '';

    const outputCode = getCode(this.state);

    const inputLightnessValue = toString((!isNil(lighten) ? lighten : 0) - (!isNil(darken) ? darken : 0));
    const inputSaturationValue = toString((!isNil(saturate) ? saturate : 0) - (!isNil(desaturate) ? desaturate : 0));
    const inputHueValue = toString(!isNil(adjust_hue) ? adjust_hue : '0');

    const isDev = process.env.NODE_ENV !== 'production' ? true : false;

    return (
      <div>
        <Header />

        <section id='main' className='wrapper card'>
          <form
            action=''
            method='get'
            acceptCharset='utf-8'
            className={hexIsValid ? 'active' : 'inactive'}>
            <ul id='content'>

              <li id='swatchInput' className='listItem swatch'>
                <div className='swatchColor' style={{backgroundColor: hexIsValid ? `#${hex}` : ''}}>
                  <div className='swatchColorValue'>
                    <label htmlFor='hexInput'>
                      #
                    </label>
                    <input
                      type='text'
                      name='hexInput'
                      maxLength='6'
                      placeholder='0183B7'
                      autoFocus={true}
                      value={hex}
                      onChange={this.handleHexInput}
                    />
                    <div className='initialHelp' style={{display: hexIsValid ? 'none' : 'block'}}>
                      &larr; Go ahead, give us a hex code
                    </div>
                  </div>
                  <div className='swatchColorPointer' style={{borderLeftColor: hexIsValid ? `#${hex}` : ''}}></div>
                </div>
              </li>

              {hexIsValid &&
                <li id='swatchOutput' className='listItem swatch'>
                  <div className='swatchColor' style={{backgroundColor: '#' + hexOutput}}>
                    <div className='swatchColorValue'>
                      <label htmlFor='hexOutput'>
                        #
                      </label>
                      <input
                       type='text'
                       name='hexOutput'
                       value={hexOutput}
                       readOnly
                       onClick={this.handleCopyInputValue}
                      />
                    </div>
                  </div>
                </li>}

              <li className='listItem'>
                <div className='codeOutput'>
                  <input
                    type='text'
                    id='code'
                    tabIndex='-1'
                    readOnly='readonly'
                    placeholder='Adjust sliders, get Sass'
                    value={outputCode}
                    onClick={this.handleCopyInputValue}
                  />
                </div>
              </li>

              <li className='listItem slider'>
                <a
                  href='#'
                  onClick={this.handleResetInputSlider.bind(this, 'lighten')}
                  style={{display: !isNil(lighten) || !isNil(darken) ? 'block' : 'none'}}>
                  Reset
                </a>
                <input
                  type='range'
                  min='-100'
                  max='100'
                  disabled={!hexIsValid}
                  id='sliderLighten'
                  onChange={this.handleInputSlider.bind(this, 'lighten')}
                  value={inputLightnessValue}
                />
                <label htmlFor='sliderLighten' className='sliderLabel'>
                  <span>darken</span>
                  <span>lighten</span>
                </label>
              </li>
              <li className='listItem slider'>
                <a
                  href='#'
                  onClick={this.handleResetInputSlider.bind(this, 'saturate')}
                  style={{display: !isNil(saturate) || !isNil(desaturate) ? 'block' : 'none'}}>
                  Reset
                </a>
                <input
                  type='range'
                  min='-100'
                  max='100'
                  disabled={!hexIsValid}
                  id='sliderSaturate'
                  onChange={this.handleInputSlider.bind(this, 'saturate')}
                  value={inputSaturationValue}
                />
                <label htmlFor='sliderSaturate' className='sliderLabel'>
                  <span>desaturate</span>
                  <span>saturate</span>
                </label>
              </li>
              <li className='listItem slider'>
                <a
                  href='#'
                  onClick={this.handleResetInputSlider.bind(this, 'adjust_hue')}
                  style={{display: !isNil(adjust_hue) ? 'block' : 'none'}}>
                  Reset
                </a>
                <input
                  type='range'
                  min='-360'
                  max='360'
                  disabled={!hexIsValid}
                  id='sliderAdjustHue'
                  onChange={this.handleInputSlider.bind(this, 'adjust_hue')}
                  value={inputHueValue}
                />
                <label htmlFor='sliderAdjustHue' className='sliderLabel'>
                  adjust hue
                </label>
              </li>
            </ul>
          </form>
        </section>

        {isDev &&
          <SassTests />}
      </div>
    );
  }
}

App.propTypes = {
  hex: React.PropTypes.string,
  lighten: React.PropTypes.number,
  darken: React.PropTypes.number,
  saturate: React.PropTypes.number,
  desaturate: React.PropTypes.number,
  adjust_hue: React.PropTypes.number
};
// @type {SassMeState}
App.defaultProps = {
  hex: '',
  lighten: undefined,
  darken: undefined,
  saturate: undefined,
  desaturate: undefined,
  adjust_hue: undefined
};
