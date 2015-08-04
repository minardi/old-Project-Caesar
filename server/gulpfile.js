/*
!IMPORTANT!

For build and running tests: gulp build

*/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    filter = require('gulp-filter'),    
    flatten = require('gulp-flatten'),
    del = require('del'),
    runSequence = require('run-sequence'),
    qunit = require('gulp-qunit'),
    merge = require('merge-stream'),
    replace = require('gulp-replace'),
    path = './public';

gulp.task('build', function () {
    runSequence('clean', 'ConcatAndMinify', 'fonts', 'img', 'test', 'replace');
});

gulp.task('clean', function (cb) {
    del([path], cb);
});

gulp.task('ConcatAndMinify', function () {
    var assets = useref.assets();
    
    return gulp.src('../client/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(path));   
});

gulp.task('fonts', function () {
    return gulp.src('../client/css/fonts/*')
        .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(flatten())
        .pipe(gulp.dest(path + '/fonts'));
});

gulp.task('img', function () {
    return gulp.src('../client/img/*')
        .pipe(filter('*.jpg'))
        .pipe(flatten())
        .pipe(gulp.dest(path + '/img'));
});

gulp.task('test', function() {
    return gulp.src('./tests/index.html') //specify src path if changed
        .pipe(qunit());
});


gulp.task('replace', function(){    
    return gulp.src([path + '/styles.css'])
        .pipe(replace('../fonts', './fonts'))
        .pipe(gulp.dest(path));
});


