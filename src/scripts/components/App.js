import React, {Component, PropTypes} from 'react';
import {isNil, teamplate, toString, reduce} from 'lodash';
import {hex2hsl, hsl2hex} from '../utils/colorConversions';
import {lighten, saturate, adjustHue} from '../utils/colorTransforms';
import Header from './Header';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  calculateOutputHex = () => {
    const {hex, lightness, saturation, hue} = this.state;
    let hsl = hex2hsl(hex);

    if (!isNil(lightness)) {
      const newLightness = hsl.l + lightness;
      if (newLightness < 0) {
        hsl.l = 0;
      } else if (newLightness > 100) {
        hsl.l = 100;
      } else {
        hsl.l = newLightness;
      }
    }

    if (!isNil(saturation)) {
      const newSaturation = hsl.s + saturation;
      if (newSaturation < 0) {
        hsl.s = 0;
      } else if (newSaturation > 100) {
        hsl.s = 100;
      } else {
        hsl.s = newSaturation;
      }
    }

    if (!isNil(hue)) {
      const newHue = hsl.h + hue;
      if (newHue < -360) {
        hsl.h = newHue + 360;
      } else if (newHue > 360) {
        hsl.h = newHue - 360;
      } else {
        hsl.h = newHue;
      }
    }

    return hsl2hex(hsl);
  }

  outputCode = () => {
    const {hex, lightness, saturation, hue} = this.state;
    let funcs = [];

    if (!isNil(lightness)) {
      funcs.push({
        name: lightness >= 0 ? 'lighten' : 'darken',
        value: lightness >= 0 ? lightness : Math.abs(lightness)
      });
    }

    if (!isNil(saturation)) {
      funcs.push({
        name: saturation >= 0 ? 'saturate' : 'desaturate',
        value: saturation >= 0 ? saturation : Math.abs(saturation)
      });
    }

    if (!isNil(hue)) {
      funcs.push({
        name: 'adjust-hue',
        value: hue
      });
    }

    return funcs.length > 0
      ? reduce(funcs, (accum, func) => {
          const {name, value} = func;
          return `${name}(${accum}, ${Math.round(value)})`;
        }, '#' + hex)
      : '';
  }

  handleInputHex = (e) => {
    // Strip out non-hexadecimal values
    let input = e.target.value.match(/[0-9A-Fa-f]/g);
    input = input ? input.join('') : '';

    // Set the input and reset the sliders
    this.setState({
      hex: input,
      lightness: undefined,
      saturation: undefined,
      hue: undefined
    });
  }

  handleInputSlider = (stateKey, e) => {
    let newState = {};
    newState[stateKey] = Number(e.target.value);
    this.setState(newState);
  }

  handleResetInputSlider = (stateKey) => {
    let newState = {};
    newState[stateKey] = undefined;
    this.setState(newState);
  }

  render() {
    const {hex, lightness, saturation, hue} = this.state;

    const hexIsValid = hex.length === 6;

    const swatchPointerBorder = hexIsValid ? {borderLeftColor: '#' + hex} : {};
    const swatch1bg = hexIsValid ? {backgroundColor: '#' + hex} : {};

    const outputHex = hexIsValid ? this.calculateOutputHex() : '';
    const swatch2bg = hexIsValid ? {backgroundColor: '#' + outputHex} : {};
    const formClass = hexIsValid ? 'active' : 'inactive';
    const helpStyle = {display: hexIsValid ? 'none' : 'block'};


    const inputLightnessValue = !isNil(lightness) ? lightness : '0';
    const inputSaturationValue = !isNil(saturation) ? saturation : '0';
    const inputHueValue = !isNil(hue) ? hue : '0';

    return (
      <div>
        <Header />

        <section id='container' className='wrapper'>
          <form
            action=''
            method='get'
            acceptCharset='utf-8'
            className={formClass}>
            <ul id='content'>
              <li id='swatch1' className='listItem swatchContainer'>
                <p className='swatchLabel'>Input color</p>
                <div className='swatch' style={swatch1bg}>
                  <div id='colorInput'>
                    <label htmlFor='color'>
                      #
                    </label>
                    <input
                      type='text'
                      name='color'
                      id='color'
                      maxLength='6'
                      placeholder='0183B7'
                      autoFocus={true}
                      value={hex}
                      onChange={this.handleInputHex}
                    />
                    <div id='initialHelp' style={helpStyle}>
                      &larr; Go ahead, give us a hex code
                    </div>
                  </div>
                  <div className='swatchPointer' style={swatchPointerBorder}></div>
                </div>
              </li>

              <li id='swatch2' className='listItem swatchContainer'>
                <p className='swatchLabel'>Output color</p>
                <div className='swatch' style={swatch2bg}>
                  {hexIsValid &&
                    <span id='colorOutput'>{outputHex}</span>}
                </div>
              </li>

              <li className='listItem'>
                <div id='codeOutput'>
                  <input
                    type='text'
                    id='code'
                    tabIndex='-1'
                    readOnly='readonly'
                    placeholder='Fiddle with the sliders to get the SASS'
                    value={this.outputCode()}
                  />
                </div>
                <div className='codeHelp'>
                  <p>Copy and use the code below:</p>
                </div>
              </li>

              <li className='listItem slider'>
                <a
                  href='#'
                  className='reset'
                  style={{opacity: !isNil(lightness) ? 1 : .25}}
                  onClick={this.handleResetInputSlider.bind(this, 'lightness')}>
                  Reset
                </a>
                <input
                  type='range'
                  min='-100'
                  max='100'
                  disabled={!hexIsValid}
                  id='slider_l'
                  onChange={this.handleInputSlider.bind(this, 'lightness')}
                  value={toString(inputLightnessValue)}
                />
                <label htmlFor='slider_l'>&larr; darken | lighten &rarr;</label>
              </li>
              <li className='listItem slider'>
                <a href='#' className='reset' onClick={this.handleResetInputSlider.bind(this, 'saturation')}>Reset</a>
                <input
                  type='range'
                  min='-100'
                  max='100'
                  disabled={!hexIsValid}
                  id='slider_s'
                  onChange={this.handleInputSlider.bind(this, 'saturation')}
                  value={toString(inputSaturationValue)}
                />
                <label htmlFor='slider_s'>&larr; desaturate | saturate &rarr;</label>
              </li>
              <li className='listItem slider'>
                <a href='#' className='reset' onClick={this.handleResetInputSlider.bind(this, 'hue')}>Reset</a>
                <input
                  type='range'
                  min='-360'
                  max='360'
                  disabled={!hexIsValid}
                  id='slider_h'
                  onChange={this.handleInputSlider.bind(this, 'hue')}
                  value={toString(inputHueValue)}
                />
                <label htmlFor='slider_h'>&larr; adjust hue &rarr;</label>
              </li>
            </ul>
          </form>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  hex: React.PropTypes.string,
  lightness: React.PropTypes.number,
  saturation: React.PropTypes.number,
  hue: React.PropTypes.number
};
App.defaultProps = {
  hex: '',
  lightness: undefined,
  saturation: undefined,
  hue: undefined
};
