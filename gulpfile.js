let projectFolder = require("path").basename(__dirname);
let sourceFolder = "#src";
let fs = require('fs');

let path ={
    build:{
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        images: projectFolder + "/images/",
        fonts: projectFolder + "/fonts/"
    },
    src:{
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html" ],
        css: sourceFolder + "/scss/mystyle.scss",
        js: sourceFolder + "/js/script.js",
        images: sourceFolder + "/images/**/*.+(png|jpg|gif|ico|svg|webp)",
        fonts: sourceFolder + "/fonts/*.ttf"
    },
    watch:{
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        images: sourceFolder + "/images/**/*.+(png|jpg|gif|ico|svg|webp)"
        // fonts: projectFolder + "/fonts/*.ttf"
    },
    clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    terser = require('gulp-terser'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require('gulp-webpcss'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    sourcemaps = require('gulp-sourcemaps');


function browserSync() {
    browsersync.init({
        server:{
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        // .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function cssDev() {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )

        .pipe(sourcemaps.write())
        .pipe(dest(path.build.css))

        .pipe(browsersync.stream())
}
function cssProd() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"],
                cascade:true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(cleanCSS())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(terser())
        // .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images(){
    return src(path.src.images)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.images))
        .pipe(src(path.src.images))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        .pipe(dest(path.build.images))
        .pipe(browsersync.stream())
}

function fonts(){
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

gulp.task('otf2ttf', function () {
    return gulp.src([sourceFolder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(sourceFolder + '/fonts/'))
});

gulp.task('svgSprite', function () {
    return gulp.src([sourceFolder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg", //sprite file name
                    example: true // посмотреть пример
                }
            }
        }))
});

function fontsStyle() {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {

}



function watchFiles(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], cssDev);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
}

function clean(){
    return del(path.clean);
}

let buildDev = gulp.series(clean, gulp.parallel(html, cssDev, js, images));
let buildProd = gulp.series(clean, gulp.parallel(html, cssProd, js, images));
// let build = gulp.series(clean, gulp.parallel(html, css, js, images));
let watch = gulp.parallel(buildDev, watchFiles, browserSync);

exports.buildDev = buildDev;
exports.buildProd = buildProd;
exports.html = html;
exports.cssDev = cssDev;
exports.cssProd = cssProd;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;
exports.watch = watch;
exports.default = watch;