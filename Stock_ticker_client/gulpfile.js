var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var config = {
    paths: {
        index: 'index.html',
        html: 'app/**/*.html',
        css: [
                'app/**/*.css', 'app/modules/**/*.css'
            ],
        js: 'app/**/*.js'
    }
}

gulp.task('browserSync', function(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    })
})

gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('watch', function(){
    gulp.watch(config.paths.index, browserSync.reload);
    gulp.watch(config.paths.html, browserSync.reload);
    gulp.watch(config.paths.css, ['css']);
    gulp.watch(config.paths.js, browserSync.reload);
})

gulp.task('start', ['browserSync', 'watch']);