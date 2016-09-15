# SassMe

[image soon to be here...]

Dynamically view the output of Sass HSL color functions in the browser. The following Sass HSL functions are available for manipulation:

- [`lighten()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method)
- [`darken()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method)
- [`saturate()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#saturate-instance_method)
- [`desaturate()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#desaturate-instance_method) (same as `grayscale()`)
- [`adjust-hue()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_hue-instance_method)

## Development

Project is built with React and based on Facebook’s officially supported [react-create-app](https://github.com/facebookincubator/create-react-app) package.

### Develop Locally

To work on the app: `npm run start` (this will start the javascript development server using scripts from `react-create-app`)

If you’re going to be editing the CSS, make sure you run `npm run css:watch` in another terminal window. This runs Sass, watches for CSS changes, and recompiles them to `src/index.css`. The `npm run start` will detect any changes to that file and recompile as necessary.

## About

### History

This project was originally conceived and built at Arc90. The original repo can still be found at [arc90/sass-color-picker](https://github.com/arc90/sass-color-picker). However, due to organization conflicts, that project is no longer maintained. This is now the **officially** successor.

Many thanks to those who helped build v1.0 [LINK] of SassMe:

- Jim Nielsen / jimniels (current project owner) [LINK]
- Darren Newton / DarrenN [LINK]
- Robert Petro / robertjpetro [LINK]
- Matt Quintanilla / mattq [LINK]
- Jesse Reiner

```text
 ____                                      __     
/\  _`\                                   /\ \    
\ \,\L\_\     __      ____    ____  __  __\ \ \   
 \/_\__ \   /'__`\   /',__\  /',__\/\ \/\ \\ \ \  
   /\ \L\ \/\ \L\.\_/\__, `\/\__, `\ \ \_\ \\ \_\
   \ `\____\ \__/.\_\/\____/\/\____/\/`____ \\/\_\
    \/_____/\/__/\/_/\/___/  \/___/  `/___/> \\/_/
                                        /\___/    
                                        \/__/     

```
