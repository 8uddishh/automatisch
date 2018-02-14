const gulp = require("gulp")
const babel = require("gulp-babel")
const featurify = require("./gulp-featurify")
const register = require("./gulp-register-templates")
const hbs = require("handlebars")

gulp.task("registerPartials", () => {
    return gulp.src("templates/partials/**/*.hbs")
    .pipe(register(hbs))
})

gulp.task("featurify", ["registerPartials"], () => {
    return gulp.src("templates/scenarios/**/*.hbs")
    .pipe(featurify(hbs))
    .pipe(gulp.dest("features"))
})

gulp.task("es6toes5", () => {
    return gulp.src("wdio.es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("wdio.compiled"))
})


gulp.task('dev', ["registerPartials", "featurify", "es6toes5"])