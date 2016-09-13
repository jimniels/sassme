import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header id='header' className='wrapper'>
    		<h1>Sass Me</h1>
    		<div id='tagline'>
    			<p>Visualize <a href="http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html" target="_blank">SASS color functions</a> in <wbr/>real-time without compiling.</p>
    		</div>
    	</header>
    );
  }
}
