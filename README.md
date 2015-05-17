Welcome to my starter project! It's an opinionated collection of languages and tools
to help get you started on making a website.

The core parts of this are:
1. Nginx and postgresql setup and configuration

2. Gulp-based build system

3. Static files in jade, stylus, and typescript

4. Python pyramid backend


## Building static assets
1. Add "alias npm-exec='PATH=$(npm bin):$PATH'" to your bashrc
This will let you use the command npm-exec and it will run modules
based on your working directory.

2. Use `npm install`

3. Run `npm-exec gulp`

To build with minified output, use
`npm-exec gulp build --production`
