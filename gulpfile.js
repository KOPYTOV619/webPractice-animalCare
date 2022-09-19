const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "./"
        }
    }); /* Запуск сервера */

    gulp.watch("./*.html").on('change', browserSync.reload);
}); /* отслеживание изменений html файлов */

gulp.task('styles', function() {
    return gulp.src("./sass/**/*.+(scss|sass)") /* берем файл из папки */

        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* компилируем */
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./css")) /* сохраняем в папку */
        .pipe(browserSync.stream()); /* обновляем страницу */
});

gulp.task('watch', function() {
    gulp.watch("./sass/**/*.+(scss|sass)", gulp.parallel('styles'));
}) /* отслеживание изменений sass файлов */

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); /* запуск всех задач */