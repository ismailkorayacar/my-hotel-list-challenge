var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass')(require('sass'));

gulp.task('styles', () => {
    return gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css/'))
        .pipe(concat('bundle-index.css'))
        .pipe(gulp.dest('./bundle/'));

});
gulp.task('js', function () {
    return gulp.src('./js/*.js')
        .pipe(concat('bundle-index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./bundle/'));
});

gulp.task('watch', () => {
    gulp.watch('sass/**/*.scss', (done) => {
        gulp.series(['styles'])(done);
    });
    gulp.watch('js/**/*.js', (done) => {
        gulp.series(['js'])(done);
    });
});

gulp.task('run', gulp.series(['watch', 'styles', 'js']));