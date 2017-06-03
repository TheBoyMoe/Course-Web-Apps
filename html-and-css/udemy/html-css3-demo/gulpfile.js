'use strict';
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const del = require('del');
const useref = require('gulp-useref');
const iff = require('gulp-if');
const csso = require('gulp-csso');
const livereload = require('gulp-livereload');

const options = {
	src: 'src',
	dist: 'dist'
};


gulp.task('compileSass', () => {
	return gulp.src(options.src + '/scss/styles.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.src + '/css'))
		.pipe(livereload());
});

gulp.task('html', ['compileSass'], () => {
	let assets = useref.assets();
	
	return gulp.src(options.src + '/index.html')
		.pipe(assets)
		.pipe(iff('*.js', uglify()))
		.pipe(iff('*.css', csso()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(options.dist));
});


// watch for changes to the app's js file
gulp.task('scripts', () => {
	return gulp.src(options.src + '/js/*.js')
		.pipe(livereload());
});


gulp.task('watchFiles', () => {
	require('./server'); // load server
	livereload.listen(); // load live-reload server
 	gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
	gulp.watch(options.src + '/js/*.js', ['scripts']);
});


gulp.task('assets', () => {
	return gulp.src([
		options.src + '/imgs/**/*',
		options.src + '/fonts/**/*',
		options.src + '/font-awesome/**/*',
		options.src + '/mail/**/*'
	], {base: options.src})
		.pipe(gulp.dest(options.dist));
});


gulp.task('clean', () => {
	del([
		options.dist,
		options.src + '/css/styles.css*'
	]);
});

// load server and watch for any changes during dev
gulp.task('serve', ['watchFiles']);

// build the production app
// gulp.task('build', ['html', 'assets']);
gulp.task('build', ['html']);


gulp.task('default', ['clean'], () => {
	gulp.start('build');
});