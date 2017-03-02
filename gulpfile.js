(function() {
    'use strict';

    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var less = require('gulp-less');
    var uglify = require('gulp-uglify');
    var notify = require('gulp-notify');
    var jshint = require('gulp-jshint');
    var sourcemaps = require('gulp-sourcemaps');
    var ngAnnotate = require('gulp-ng-annotate');
    var autoprefixer = require('gulp-autoprefixer');
    var concat = require('gulp-concat');
    var nodemon = require('gulp-nodemon');
    var browserSync = require('browser-sync');
    var reload = browserSync.reload;

    var root = './public/',
        dist = {
            js : './public/app/', //watch
            vendor : './public/build/', //destination
            bundle : './public/build/', //destination
            css : `${root}build/`,
            fonts : `${root}build/fonts/`,
            sass : `${root}sass/`,
            bower: './bower_components/'
        };

    gulp.task('browser-sync', ['nodemon'], function() {
        browserSync.init(null,{
            proxy: 'localhost:5000',
            port: 9000,
            notify: true
        });

        gulp.watch('./public/sass/*.scss', ['sass']);
        gulp.watch(['./public/app/*.js', './public/app/**/*.js', './public/app/**/**/*.js'], ['js-frontEnd']);
        gulp.watch([`${root}*.html`, `${root}app/**/*.html`, `${root}app/**/**/*.html`]).on('change', reload);
    });

    gulp.task('less', function () {
         gulp.src(['./public/less/*.less'])
            .pipe(less())
            .pipe(gulp.dest('./public/css'));
    });

    gulp.task('sass', function() {
        gulp.src([
           `./public/sass/*.scss`
        ])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(dist.css))
        .pipe(reload({stream: true}));
        //.pipe(browserSync.stream());
    });

    gulp.task('js-frontEnd', function() {
        gulp.src([
            './public/app/*.js',
            './public/app/**/*.js'
        ])
        .pipe(sourcemaps.init())
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        //.pipe(jshint.reporter('fail'))
        //.pipe(notify({ message: 'Lint task complete' }))
        .pipe(concat('vendor.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(gulp.dest(dist.vendor));
    });

    gulp.task('scripts', function() {
       gulp.src([
           './bower_components/jquery/dist/jquery.js',
           './bower_components/bootstrap/dist/js/bootstrap.js',
           './bower_components/angular/angular.js',
           './bower_components/angular-animate/angular-animate.js',
           './bower_components/angular-loading-bar/build/loading-bar.js',
           './bower_components/angular-messages/angular-messages.js',
           './bower_components/angular-ui-router/release/angular-ui-router.js',
           './bower_components/ngstorage/ngStorage.js',
           './bower_components/angularUtils-pagination/dirPagination.js',
           './bower_components/pickaday.js',
           './bower_components/bootbox.js/bootbox.js',
           './bower_components/plotly.js/dist/plotly.js',
           './bower_components/leaflet/dist/leaflet.js'
       ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(dist.bundle));
    });

    gulp.task('css-style', function() {
        gulp.src([
            './bower_components/bootstrap/dist/css/bootstrap.css', //replaceed with bootswatch: cosmo
            './bower_components/font-awesome/css/font-awesome.css',
            './bower_components/pikaday/css/pikaday.css',
            './bower_components/angular-loading-bar/build/loading-bar.css',
            './bower_components/animate.css/animate.css',
            './bower_components/leaflet/dist/leaflet.css',
        ])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(dist.css));
    });

    gulp.task('icons', function() {
        gulp.src([
            './bower_components/bootstrap/fonts/**.*', //replaceed with bootswatch: cosmo
            './bower_components/font-awesome/fonts/**.*' //replaceed with bootswatch: cosmo
        ])
        .pipe(gulp.dest(dist.fonts));
    });

    gulp.task('nodemon', function(cb) {
        var called = false;
        return nodemon({
            script: './app.js',
            ignore: [
                'gulpfile.js',
                'node_modules/',
                '.gitignore',
                '.jshintrc',
                'Gruntfile.js',
            ]
        })
        .once('start', function() {
            if(!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function() {
            setTimeout(function() {
                reload({stream: false});
            }, 1000);
        });
    });

    gulp.task('default', ['browser-sync', 'sass', 'js-frontEnd'], function() {
        gulp.watch(['public/*.html', 'public/app/**/*.html'], reload);
    });

})();
