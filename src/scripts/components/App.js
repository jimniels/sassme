import React, {Component, PropTypes} from 'react';
import {isNil, teamplate, toString, reduce, pickBy, pick} from 'lodash';
import {getCode, transformHex} from '../utils/colorTransforms';
import Header from './Header';
import SassTests from './SassTests';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  handleInputHex = (e) => {
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

  handleLighten = (e) => {
    const newVal = Number(e.target.value);
    this.setState({
      lighten: newVal >= 0 ? newVal : this.state.lighten,
      darken: newVal >= 0 ? this.state.darken : Math.abs(newVal)
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

  handleResetInputSlider = (stateKey) => {
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

    const swatchPointerBorder = hexIsValid ? {borderLeftColor: '#' + hex} : {};
    const swatch1bg = hexIsValid ? {backgroundColor: '#' + hex} : {};

    const outputHex = hexIsValid
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
    const swatch2bg = hexIsValid ? {backgroundColor: '#' + outputHex} : {};
    const formClass = hexIsValid ? 'active' : 'inactive';
    const helpStyle = {display: hexIsValid ? 'none' : 'block'};


    const inputLightnessValue = (!isNil(lighten) ? lighten : 0) - (!isNil(darken) ? darken : 0);
    const inputSaturationValue = (!isNil(saturate) ? saturate : 0) - (!isNil(desaturate) ? desaturate : 0);
    const inputHueValue = !isNil(adjust_hue) ? adjust_hue : '0';

    const isDev = process.env.NODE_ENV !== 'production' ? true : false;

    return (
      <div>
        <Header />

        <section id='main' className='wrapper card'>
          <form
            action=''
            method='get'
            acceptCharset='utf-8'
            className={formClass}>
            <ul id='content'>
              <li id='colorIn' className='listItem swatch'>
                <p className='swatchLabel'>Input color</p>
                <div className='swatchColor' style={swatch1bg}>
                  <div className='swatchColorValue'>
                    <label htmlFor='hexColorIn'>
                      #
                    </label>
                    <input
                      type='text'
                      name='hexColorIn'
                      maxLength='6'
                      placeholder='0183B7'
                      autoFocus={true}
                      value={hex}
                      onChange={this.handleInputHex}
                    />
                    <div className='initialHelp' style={helpStyle}>
                      &larr; Go ahead, give us a hex code
                    </div>
                  </div>
                  <div className='swatchColorPointer' style={swatchPointerBorder}></div>
                </div>
              </li>

              <li id='colorOut' className='listItem swatch'>
                <p className='swatchLabel'>Output color</p>
                <div className='swatchColor' style={swatch2bg}>
                  {hexIsValid &&
                    <div className='swatchColorValue'>
                      <label htmlFor='hexColorOut'>
                        #
                      </label>
                      <input
                       type='text'
                       name='hexColorOut'
                       value={outputHex}
                       readOnly
                       onClick={this.handleCopyInputValue}
                      />
                    </div>}
                </div>
              </li>

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
                  className='reset'
                  onClick={this.handleResetInputSlider.bind(this, 'lighten')}>
                  Reset
                </a>
                <input
                  type='range'
                  min='-100'
                  max='100'
                  disabled={!hexIsValid}
                  id='sliderLighten'
                  onChange={this.handleInputSlider.bind(this, 'lighten')}
                  value={toString(inputLightnessValue)}
                />
                <label htmlFor='sliderLighten' className='sliderLabel'>
                  <span>darken</span>
                  <span>lighten</span>
                </label>
              </li>
              <li className='listItem slider'>
                <a href='#' className='reset' onClick={this.handleResetInputSlider.bind(this, 'saturate')}>Reset</a>
                <input
                  type='range'
                  min='-100'
                  max='100'
                  disabled={!hexIsValid}
                  id='sliderSaturate'
                  onChange={this.handleInputSlider.bind(this, 'saturate')}
                  value={toString(inputSaturationValue)}
                />
                <label htmlFor='sliderSaturate' className='sliderLabel'>
                  <span>desaturate</span>
                  <span>saturate</span>
                </label>
              </li>
              <li className='listItem slider'>
                <a href='#' className='reset' onClick={this.handleResetInputSlider.bind(this, 'adjust_hue')}>Reset</a>
                <input
                  type='range'
                  min='-360'
                  max='360'
                  disabled={!hexIsValid}
                  id='sliderAdjustHue'
                  onChange={this.handleInputSlider.bind(this, 'adjust_hue')}
                  value={toString(inputHueValue)}
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
