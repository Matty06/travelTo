const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

// compile scss --> css
function style() {
    // where is my scss file
    return gulp.src('./assets/scss/**/*.scss')
    // pass through sass compiler
    .pipe(sass().on('error', sass.logError))
    // where do I save compiled css
    .pipe(gulp.dest('./assets/css'))

    // stream all changes to browser
    .pipe(browserSync.stream());
}

function sassWatch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./assets/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    
}

gulp.task('minify-css', () => {
    return gulp.src('assets/css/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('assets/css'));
  });



exports.style = style;
exports.sassWatch = sassWatch;
