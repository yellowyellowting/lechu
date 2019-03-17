const path = require('path'); //
const fs = require('fs');  //常量使用const
const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();


//指定读取src下的文件，并放在fileArr数组内
const readDir = (path, fileArr) => {
    let ret = fs.readdirSync(path) //fs.readdirSync方法将返回一个包含“指定目录下所有文件名称”的数组对象。由于该方法属于fs模块，使用前需要引入fs模块
    ret.map((fileName) => {
        let curPath = path + '/' + fileName
        const stats = fs.statSync(curPath)
        if (stats.isFile()) {                 //isFile()判断是否为正常文件
            fileArr.push(curPath)
        } else if (stats.isDirectory()) {    //isDirectory()判断是否为目录
            readDir(curPath, fileArr)
        }
    });
}

const filePath = path.resolve() + '/src/pages/'; // path.resolve() 获取当前文件的完整地址
let files = [];
readDir(filePath, files);

//过滤
const jsFiles = files.filter(fileName => fileName.endsWith('.js'));
const lessFiles = files.filter(fileName => fileName.endsWith('.less'));
const htmlFiles = files.filter(fileName => fileName.endsWith('.html'));

// 打包js, Browserify构建es6环境下的自动化前端项目
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
        .pipe(plugins.plumber())
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
        .pipe(plugins.imagemin({ progressive: true }))
        .pipe(gulp.dest('dist/img'))
});

// 打包html
gulp.task('html', function () {
    return gulp.src(htmlFiles)
        .pipe(plugins.plumber())
        .pipe(plugins.htmlmin())
        .pipe(plugins.rename({
            dirname: ''
        }))
        .pipe(gulp.dest('dist'));
});

//监听
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
