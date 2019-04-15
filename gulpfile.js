// =============================================================
// 1. Configuration
// =============================================================

// 1.1 - Gulp Packages
// ------------------------------
const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');


// 1.2 - Global Paths
// ------------------------------
const all = '**/*.*',
    folders = '**/*';


// ==============================================================
// 2. Functions
// ==============================================================

// 2.1 - Clean folder
// ------------------------------
function clean(path) {
    return del(path);
};

// 2.2 - Minimize Scripts
// ------------------------------
function scripts(src, dist) {
    return (
        gulp
        .src(src, {
            sourcemaps: true
        })
        .pipe(uglify())
        .pipe(gulp.dest(dist))
    );
};


// 2.3 - Optmize images
// ------------------------------
function images(src, dest) {
    return (
        gulp
        .src(src)
        .pipe(imagemin())
        .pipe(gulp.dest(dest))
    )
};

// 2.4 - HTML
// ------------------------------
function html(src, dest) {
    return (
        gulp
        .src(src)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(gulp.dest(dest))
    )
};

// 2.5 - Copy
// ------------------------------
function copy(src, dest) {
    return gulp.src(src)
        .pipe(gulp.dest(dest));
};


// 2.6 - Start server
// ------------------------------
function liveServer(path, proxy) {
    let options = proxy ? {
        proxy: backend.proxy
    } : {
        server: {
            baseDir: path
        }
    };
    browserSync.init(options);
    gulp.watch(frontend.src).on('change', gulp.series('frontend:develop', liveReload));
};


// 2.7 - Reload page
// ------------------------------
function liveReload() {
    browserSync.reload();
};


// =============================================================
// 3. Front-end
// =============================================================

// 3.1 - Paths
// ------------------------------
const frontend = new function () {
    this.root = 'front-end/';
    this.all = this.root + all;
    this.src = this.root
    this.dist = 'dist/';
    this.assets = this.src + 'assets/' + folders;
    this.vendors = this.src + 'vendor/' + folders;
    this.scripts = this.src + 'assets/**/*.js';
    this.images = this.src + 'assets/img/' + folders;
};

// 3.2 - Assets
// ------------------------------'
gulp.task('frontend:assets', () => copy(frontend.assets, frontend.dist + 'assets/'));

// 3.3 - Vendors
// ------------------------------
gulp.task('frontend:vendors', () => copy(frontend.vendors, frontend.dist + 'vendor/'));

// 3.4 - Scripts
// ------------------------------
gulp.task('frontend:scripts', () => scripts(frontend.scripts, frontend.dist + 'assets/'));

// 3.5 - Images
// ------------------------------
gulp.task('frontend:images', () => images(frontend.images, frontend.dist + 'assets/img/'));

// 3.6 - HTML
// ------------------------------
gulp.task('frontend:html', () => html(frontend.src + '/**/*.html', frontend.dist));

// 3.7 - Clean build files
// ------------------------------
gulp.task('frontend:clean', () => clean(frontend.dist));
gulp.task('clean', gulp.series('frontend:clean'));

// 3.8 - Build
// ------------------------------
gulp.task('build',
    gulp.series(
        'frontend:clean',
        'frontend:assets',
        'frontend:vendors',
        'frontend:scripts',
        'frontend:images',
        'frontend:html'
    )
);

// 3.9 - Develop
// ------------------------------
gulp.task('frontend:develop',
    gulp.series(
        'frontend:clean',
        'frontend:assets',
        'frontend:vendors',
        'frontend:scripts',
        () => copy(frontend.images, frontend.dist + 'assets/img/'),
        'frontend:html'
    )
);

// 3.10 - Start Server
// ------------------------------
gulp.task('default', gulp.series('frontend:develop', () => liveServer(frontend.dist)));
