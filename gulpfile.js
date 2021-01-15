
'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename')
const sass = require('gulp-sass'); 
sass.compiler = require("node-sass"); //necessario para funcionar gulp-sass
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', watch);

gulp.task('sass', compilaSass);

function compilaSass(){
    return gulp
        .src("src/scss/**/*.scss")
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError)) //converter sass para css com gulp-sass
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({extname:'.min.css'})) //renomeando arquivo
        .pipe(gulp.dest("src/css/")); //CSS mimificado com gulp-sass
}

function watch(){
    gulp.watch("src/scss/**/*.scss", compilaSass)
}

