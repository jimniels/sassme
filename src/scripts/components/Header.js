import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className='header wrapper'>
    		<h1 className='headerLogo'>
          SassMe
        </h1>
    		<div className='headerTagline'>
    			<p>
            Visualize <a href='http://sass-lang.com/documentation/Sass/Script/Functions.html#hsl_functions' target='_blank'>Sass HSL color functions</a> in real-time without compiling. Brought to you by <a href='http://jim-nielsen.com/'>Jim</a> <a href='http://twitter.com/jimniels'>Nielsen</a>. Code is on <a href='http://github.com/jimniels/sassme'>Github</a>.
          </p>
    		</div>
    	</header>
    );
  }
}
