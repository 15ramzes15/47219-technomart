"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var uglify = require("gulp-uglify");


gulp.task("default", ["clean"], function() {
	gulp.run("dev");
});

gulp.task("dev", ["style", "script", "serve"]);

gulp.task("style", function(){
  return gulp.src("sass/style.scss")
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
      "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"));
});

gulp.task("script", function() {
  gulp.src("js/main.js")
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'Scripts',
          message: err.message
        }
      })
    }))
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest('js'));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "."
  });

  gulp.watch("sass/style.scss", ["style"]);
  gulp.watch("js/main.js", ["script"]);
  gulp.watch("*.html")
    .on("change", server.reload);
});

gulp.task("clean", function() {
	return gulp.src("css/")
		.pipe(clean());
})
