import React, { Component } from 'react';
import sassMeLogo from '../../img/sassme-logo.svg';

export default class Header extends Component {
  render() {
    return (
      <header className='header wrapper'>
        <h1 className='headerLogo'>
          <img src={sassMeLogo} alt='SassMe logo' width='168' height='72' />
        </h1>
        <p className='headerTagline'>
          Visualize <a href='http://sass-lang.com/documentation/Sass/Script/Functions.html#hsl_functions' target='_blank'>Sass HSL color functions</a> in real-time without compiling. Made by <a href='http://jim-nielsen.com/'>Jim</a> <a href='http://twitter.com/jimniels'>Nielsen</a>. Code’s on <a href='http://github.com/jimniels/sassme'>Github</a>. Do the same thing but in  CSS at <a href='https://colorme.io/' target='_blank'>ColorMe.io</a>.
        </p>
      </header>
    );
  }
}
