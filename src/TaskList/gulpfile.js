/// <binding />
var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
//var csso = require('gulp-csso');

var destPath = './wwwroot/libs/';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(destPath)
        .pipe(clean());
});
gulp.task('sass', function () {
    gulp.src('./css/main.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('./wwwroot/css'));

});

gulp.task("scriptsNStyles", () => {
    gulp.src([
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./wwwroot/libs"));



    gulp.src(['scripts/*.html']).pipe(gulp.dest('./wwwroot/'));
});

var tsProject = ts.createProject('scripts/tsconfig.json');
gulp.task('ts', function (done) {
    //var tsResult = tsProject.src()
    var tsResult = gulp.src([
            "scripts/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./wwwroot/appScripts'));
});

gulp.task('watch', ['watch.ts', 'watch.html', 'watch:sass']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('scripts/*.ts', ['ts']);
});

gulp.task('watch.html', ['scriptsNStyles', 'sass'], function () {
    return gulp.watch('scripts/*.html', ['scriptsNStyles']);
});

gulp.task('watch:sass', function () {
    gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('default', ['scriptsNStyles', 'sass', 'watch']);