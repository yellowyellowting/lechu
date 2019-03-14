const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');

const plugins = loadPlugins();

const readDir = (path, fileArr) => {
    let ret = fs.readdirSync(path)
    ret.map((fileName) => {
        let curPath = path + '/' + fileName
        const stats = fs.statSync(curPath)
        if (stats.isFile()) {
            fileArr.push(curPath)
        } else if (stats.isDirectory()) {
            readDir(curPath, fileArr)
        }
    });
}

const filePath = path.resolve() + '/src/pages/';
let files = [];
readDir(filePath, files);

const jsFiles = files.filter(fileName => fileName.endsWith('.js'));
const lessFiles = files.filter(fileName => fileName.endsWith('.less'));
const htmlFiles = files.filter(fileName => fileName.endsWith('.html'));

// 打包js
gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(plugins.bro({
            transform: [
                ['babelify', {
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                "esmodules": true,
                            },
                            useBuiltIns: 'usage'
                        }]
                    ]
                }],
            ]
        }))
        // .pipe(plugins.uglify())
        .pipe(plugins.rename({
            dirname: ''
        }))
        .pipe(gulp.dest('dist/js'));
});

// 打包css
gulp.task('less', function () {
    return gulp.src(lessFiles)
        .pipe(plugins.less())
        .pipe(plugins.cleanCss())
        .pipe(plugins.rename({
            dirname: ''
        }))
        .pipe(gulp.dest('dist/css'));
});

// 打包图片
gulp.task('img', function () { 
    return gulp.src('src/assets/img/*.*')
    .pipe(plugins.imagemin({progressive: true}))
    .pipe(gulp.dest('dist/img'))
});

// 打包html
gulp.task('html', function () {
    return gulp.src(htmlFiles)
        .pipe(plugins.htmlmin())
        .pipe(plugins.rename({
            dirname: ''
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.*', ({
        path
    }) => {
        switch (true) {
            case path.endsWith('.js'):
                gulp.start('js');
                break;
            case path.endsWith('.less'):
                gulp.start('less');
                break;
            case path.endsWith('.html'):
                gulp.start('html');
                break;
        }
    });
});

// 启动live reload server
gulp.task('server', function () {
    return gulp.src('dist')
        .pipe(plugins.webserver({
            port: 8081,
            livereload: true,
            open: true,
            directoryListing: {
                enable: true,
                path: 'dist'
            }
        }));
});

gulp.task('default', plugins.sequence('js', 'less', 'img', 'html', 'watch', 'server'));