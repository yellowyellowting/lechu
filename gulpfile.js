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

// 删除dist目录
gulp.task('clean', function () {
    gulp.src('dist', {
        read: false
    })
    .pipe(plugins.clean({
        force: true
    }));
});

// 打包js
gulp.task('js', function () {
    gulp.src(jsFiles)
        .pipe(plugins.bro({
            transform: [
                ['babelify', { presets: ['@babel/preset-env'] }],
            ]
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ dirname: '' }))
        .pipe(gulp.dest('dist/js'))
});

// 打包css
gulp.task('less', function () {
    gulp.src(lessFiles)
        .pipe(plugins.less())
        .pipe(plugins.cleanCss())
        .pipe(plugins.rename({ dirname: '' }))
        .pipe(gulp.dest('dist/css'));
});

// 打包图片
gulp.task('img', function () { 
    gulp.src('src/assets/img/*.*')
    .pipe(plugins.imagemin({progressive: true}))
    .pipe(gulp.dest('dist/img'))
});

// 打包html
gulp.task('html', function () {
    gulp.src(htmlFiles)
        .pipe(plugins.htmlmin())
        .pipe(plugins.rename({ dirname: '' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/**', ['js', 'less', 'img', 'html']);
});

// 启动live reload server
gulp.task('server', function () {
    setTimeout(() => {
        gulp.src('dist')
        .pipe(plugins.webserver({
            port: 8081,
            livereload: true,
            open: true
        }));
    }, 3000);
});

gulp.task('default', ['clean'], function () {
    gulp.start('server', 'js', 'less', 'img', 'html', 'watch');
});