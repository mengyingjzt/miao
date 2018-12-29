var gulp = require("gulp");

var sass = require("gulp-sass");

var minCss = require("gulp-clean-css");

var uglify = require("gulp-uglify");

var server = require("gulp-webserver");

var data = require("./mock/data.json");

var path = require("path");

var fs = require("fs");

var url = require("url");
//编译 压缩css
gulp.task("devSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"))
})

//压缩js
// gulp.task("devUgly", function() {
//     return gulp.src('./src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest("./src/build"))
// })

//监听scss
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"))
        // return gulp.watch("./src/js/*.js", gulp.series("devUgly"))
})

//起服务
gulp.task("server", function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    res.end();
                    return
                }
                if (pathname === "/api/list") {
                    res.end(JSON.stringify({ code: 1, data: data }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }))
})


gulp.task("dev", gulp.series("devSass", "server", "watch"))