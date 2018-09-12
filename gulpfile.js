let gulp = require('gulp');
let concat = require('gulp-concat');
let babel = require('gulp-babel');

gulp.task('concat', function(){
    gulp.src(['App/app.js','App/Controllers/**/*.js','App/Directives/**/*.js','App/Factories/**/*.js','App/Services/**/*.js'])
        .pipe(concat('App/app.concat.js'))
        .pipe(babel({compact:false, presets: ['env']}))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function(){
    gulp.watch(['App/app.js','App/Controllers/**/*.js','App/Directives/**/*.js','App/Factories/**/*.js','App/Services/**/*.js'], ['concat']);
});