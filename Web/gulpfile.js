/*
*	GULP FIle
*	Author: Alex Lepsa
*	===========================================================================
*/

// Declarations + Dependencies
// ----------------------------------------------------------------------------

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var concat = require('gulp-concat');

// Styles Deps
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var autoPrefixerOptions = {
    browsers: ['last 8 versions']
};

// Constants
var SCSS_PATH = 'src/styles/';
var SCSS_FUNC_MIXINS = SCSS_PATH + 'functions-mixins/';
var CONT_PATH = 'src/react-redux/containers/';
var COMP_PATH = 'src/react-redux/components/';
var DIST_STYLES_PATH = 'public/';

// Build scss mixins/functions
gulp.task('build-scss-mixins-functions', function () {
    return gulp
        .src(SCSS_FUNC_MIXINS + '*.scss')
        .pipe(concat('_scss-mixins-functions.scss'))
        .pipe(gulp.dest(SCSS_PATH + 'base'));
});

// Build container styles
gulp.task('build-scss-containers', function () {
    return gulp
        .src(CONT_PATH + '**/*.scss')
        .pipe(concat('_containers.scss'))
        .pipe(gulp.dest(SCSS_PATH + 'base'));
});

// Build component styles
gulp.task('build-scss-components', function () {
    return gulp
        .src(COMP_PATH + '**/*.scss')
        .pipe(concat('_components.scss'))
        .pipe(gulp.dest(SCSS_PATH + 'base'));
});

// Build all styles
gulp.task('styles', function () {
    return gulp
        .src(SCSS_PATH + 'style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoPrefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_STYLES_PATH));
});

// Main build
gulp.task('build', function (callback) {
    gulpSequence(
        ['build-scss-mixins-functions',
            'build-scss-containers',
            'build-scss-components'],
        'styles')(callback);
});

// Watch and rebuild styles
gulp.task('watch', ['build'],
    function () {
        gulp.watch([
            SCSS_PATH + '*/*.scss',
            CONT_PATH + '*.scss',
            CONT_PATH + '*/*.scss',
            COMP_PATH + '*/*.scss'
        ], ['build']);
    }
);

gulp.task('default', ['watch']);
