# SassMe

[![Screenshot of Sassme](https://i.imgur.com/9fPZaaU.png)](http://jim-nielsen.com/sassme/)

Dynamically view the output of Sass HSL color functions in the browser. The following Sass HSL functions are available for manipulation:

- [`lighten()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method)
- [`darken()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method)
- [`saturate()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#saturate-instance_method)
- [`desaturate()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#desaturate-instance_method) (same as `grayscale()`)
- [`adjust-hue()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_hue-instance_method)

## Development

Project is built with React and based on Facebook’s officially supported [react-create-app](https://github.com/facebookincubator/create-react-app) package. There are two relevant commands for local development:

1. `npm run start` - This will start the javascript development server using scripts from `react-create-app`.
2. `npm run css:watch` - If you’re going to be editing the CSS, make sure you run this command in a separate terminal window. This runs Sass, watches for CSS changes, and recompiles them to `src/index.css`. The development server will detect any changes to that file and recompile as necessary.

## Deployment

Site is hosted on Github pages. `gh-pages` is the active build being hosted. `master` branch reflects current state of code.

1. `npm run build` - Creates a new folder `build` in the project root that contains the entire project (controlled by [react-create-app](https://github.com/facebookincubator/create-react-app))
2. `./deploy.sh` - Deploys the `build` folder to the `gh-pages` branch.

## About

This project was originally conceived and built at Arc90. When first deployed, it lived on the web at `http://sassme.arc90.com/` and the original codebase was hosted under Arc90’s Github account at [arc90/sass-color-picker](https://github.com/arc90/sass-color-picker). However, due to organization conflicts, that repo is no longer maintained. This is now the **official** successor.

Many thanks to those who helped build [v1.0 of SassMe](https://github.com/jimniels/sassme/releases/tag/1.0):

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
