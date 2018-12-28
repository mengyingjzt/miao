var gulp = require("gulp");

var sass = require("gulp-sass");

var minCss = require("gulp-clean-css");

var uglify = require("gulp-uglify");

var server = require("gulp-webserver");

//编译 压缩css
gulp.task("devSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"))
})

//压缩js
gulp.task("devUgly", function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest("./src/build"))
})

//监听scss
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"))
})

//起服务
gulp.task("server", function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
        }))
})


gulp.task("dev", gulp.series("devSass", "devUgly", "server", "watch"))