'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var wrench = require('wrench');
var del = require('del');
var environments = require('gulp-environments');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var shell = require('gulp-shell');

var config = require('./gulp/config');

// build tasks
var build = function(callback) {
    runSequence(
        'clean:everything',
        'styles',
        'scripts',
        'assets',
        callback
    );
};

var prodBuild = function(callback) {
    runSequence(
        'clean:everything',
        'styles',
        'minify-css',
        'scripts',
        'assets',
        callback
    );
};

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

gulp.task('clean:everything', function() {
    return del('dist');
});

// DEV build
gulp.task('build', function(callback) {
    environments.current(environments.development);
    build(callback);
});

// PROD build
gulp.task('production', function(callback) {
    environments.current(environments.production);
    prodBuild(callback);
});

// WATCH TASK
gulp.task('watch', ['build'], function() {
    livereload.listen();
    gulp.watch(config.paths.styles.src + '**/*.scss', ['styles', 'assets']);
    gulp.watch(config.paths.scripts.src + '**/*.js', ['scripts']);
    gulp.watch([
        config.paths.views.src + '**/*',
        config.paths.views.pages + '**/*',
        config.paths.data.src + '**/*'
    ], ['build']);
});

gulp.task('commandline', shell.task([
	'dotnet restore',
	'dotnet watch run'
]));

gulp.task('razor_watch', ['commandline', 'watch']);

gulp.task('deploy', ['production'], shell.task([
	'dotnet restore',
	'dotnet publish --output "' + gutil.env.dest + '" --configuration Release'
]));

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['razor_watch']);
