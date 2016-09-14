import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className='header wrapper'>
    		<h1 className='headerLogo'>
          Sass Me
        </h1>
    		<div className='headerTagline'>
    			<p>
            Visualize <a href="http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html" target="_blank">SASS color functions</a> in real-time without compiling.
          </p>
    		</div>
    	</header>
    );
  }
}
