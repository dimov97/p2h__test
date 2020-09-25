const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

const cssFiles = [
    './src/css/main.scss',
    './src/css/media.scss',
    './src/css/swiper.css',
    './src/css/aos.css',
]
const jsFiles = [
    './src/js/swiper.min.js',
    './src/js/jquery.js',
    './src/js/aos.js',
    './src/js/main.js',
]

function styles() {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())

        .pipe(sass())

        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({level: 2}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify({toplevel: true}))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
}

function clean() {
    return del(['build/*'])
}
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/css/**/*.scss', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);

gulp.task('scripts', scripts);

gulp.task('del', clean);

gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));

gulp.task('dev', gulp.series('build','watch'));