const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const runSequence = require('run-sequence');
const pump = require('pump');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

let nodemon = require('gulp-nodemon');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');


gulp.task('script', () => {
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.pipe(sourcemaps.write('', {
        sourceRoot: ""
    })).pipe(gulp.dest('bin'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', ['script']);
});

gulp.task('assets', function () {
    return gulp.src(JSON_FILES)
        .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', () => {
    let options = {
        watch: ['./src'],
        ext: 'ts',
        tasks: ['script'],
        script: './bin/Index.js',
        delayTime: 1,
        env: {
            PORT: 3000
        },
        nodeArgs: ['--inspect'],
        sourceMap: true,
    };
    return nodemon(options).on('restart', function (env) {
        console.log('Restarting...');
    })
});

gulp.task('clean', () => {
    return del('./bin/*');
});

gulp.task('serve', callback => {
    runSequence('clean', 'script', 'nodemon', callback)
});


// gulp.task('build', () => {
//     const tsResult = tsProject.src()
//         .pipe(tsProject());
//     tsResult.pipe(minify({
//         ext: {
//             min: '.js'
//         },
//         noSource: '*'
//     }))
//         .pipe(gulp.dest('dist'));

//     // clone www file to dist
//     gulp.src('./bin/www')
//         .pipe(gulp.dest('dist'));

// });
