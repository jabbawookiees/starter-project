var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var cache = require('gulp-cached');
var debug = require('gulp-debug');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;

var jade = require('gulp-jade');

var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var typescript = require('gulp-type');
var uglify = require('gulp-uglify');

var paths = {
    'copy': ['./src/**/*.!(jade|styl|ts)'],
    'jade': ['./src/**/*.jade'],
    'stylus': ['./src/**/*.styl'],
    'typescript': ['./src/**/*.ts']
}

var copyPipeline = function(stream) {
	return stream
    .pipe(debug({title: 'Started: '}))
    .pipe(gulp.dest('./build'))
    .pipe(debug({title: 'Completed: '}));
}

var jadePipeline = function(stream) {
    return stream
    .pipe(debug({title: 'Started: '}))
    .pipe(jade())
    .pipe(gulp.dest('./build'))
    .pipe(debug({title: 'Completed: '}));
}


var stylusPipeline = function(stream) {
    return stream
    .pipe(debug({title: 'Started: '}))
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, minifyCSS()))
    .pipe(gulp.dest('./build'))
    .pipe(debug({title: 'Completed: '}));
}

var typescriptPipeline = function(stream) {
    return stream
    .pipe(debug({title: 'Started: '}))
    .pipe(typescript({declarationFiles: false, noExternalResolve: true}))
    .js.pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('./build'))
    .pipe(debug({title: 'Completed: '}));
}


gulp.task('build', function() {
	copyPipeline(gulp.src(paths.copy));
    jadePipeline(gulp.src(paths.jade));
	stylusPipeline(gulp.src(paths.stylus));
	typescriptPipeline(gulp.src(paths.typescript));
});

gulp.task('watch', function() {
    var copyStream = watch(paths.copy, {base: './src', ignoreInitial: false})
    	.pipe(plumber())
        .pipe(cache('copy'));
    copyPipeline(copyStream);

    var jadeStream = watch(paths.jade, {base: './src', ignoreInitial: false})
        .pipe(plumber())
        .pipe(cache('jade'));
    jadePipeline(jadeStream);

	var stylusStream = watch(paths.stylus, {base: './src', ignoreInitial: false})
    	.pipe(plumber())
        .pipe(cache('stylus'));
    stylusPipeline(stylusStream);

    // Typescript compilers don't play nice with gulp-watch for some reason, so we do this.
    // Caching solves the problems anyway.
    watch(paths.typescript, {base: './src', ignoreInitial: false}, function() {
        var typescriptStream = gulp.src(paths.typescript)
        .pipe(cache())
        .pipe(plumber())
        typescriptPipeline(typescriptStream);
    });
});

gulp.task('default', ['watch']);
