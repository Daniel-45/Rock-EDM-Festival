const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// CSS utilities
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// JavaScript utilities
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*'
}

// Compile Sass
function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./build/css'));
}

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./build/js'));
}

function images() {
    return src(paths.images)
        .pipe(imagemin())
        .pipe(dest('./build/images'))
        .pipe(notify({ message: 'Imagen minificada' }));
}

function webpFormat() {
    return src(paths.images)
        .pipe(webp())
        .pipe(dest('./build/images'))
        .pipe(notify({ message: 'Formato webP' }));
}

function watchFiles() {
    // **/*.scss todos los archivos con esta extensión en cualquier directorio
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
}


exports.css = css;
exports.javascript = javascript;
exports.images = images;
exports.webpFormat = webpFormat;
exports.watchFiles = watchFiles;

exports.default = series(css, javascript, watchFiles);
