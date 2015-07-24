// КОД ГЛЕБА
var modules = " main-bower-files  ",
    gulp = require('gulp');

gulp.task('bower', function() {
  setTimeout( function(){gulp.start("stand")} , 1000);
  setTimeout( function(){gulp.start("deliver")} , 2000);
  setTimeout( function(){gulp.start("die")} , 3000);
});

gulp.task('stand', function() {
  var terminal = require('child_process').spawn('bash');
  terminal.stdin.write("npm link "+modules);
  terminal.stdin.end();
});

gulp.task('die', function() {
  var terminal = require('child_process').spawn('bash');
  terminal.stdin.write("rm -rf node_modules");
  terminal.stdin.end();
});


gulp.task('deliver', function() {
  var mainBowerFiles = require('main-bower-files');
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest("./js"));
});


// КОД НИКИТЫ
// локальный сервер, компилятор и лайв-релоудер
var autoprefixer = require('gulp-autoprefixer'),
    prettify = require('gulp-prettify'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    ftp = require('vinyl-ftp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    clean = require('gulp-rimraf'),
    useref = require('gulp-useref'),
    plumber = require('gulp-plumber');

// локальный сервер
gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

// jade компилятор
gulp.task('jade', function() {
  return gulp.src('./*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}));
});

// less компилятор
gulp.task('less', function() {
  return gulp.src('./less/style.less')
    .pipe(plumber())
    .pipe(less({
      noCache: true,
      style: "expanded",
      lineNumbers: true,
      errLogToConsole: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 15 versions', 'ie 8', 'ie 9'],
      cascade: false
    }))
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream: true}));
});

// слежка (лайв-релоудер)
gulp.task('watch', function () {
  gulp.watch('./**/*.jade', ['jade']);
  gulp.watch('./**/*.less', ['less']);
  gulp.watch([
    './js/*.js',
    './*.html',
    './css/*.css'
  ]).on('change', reload);
});

// default task
gulp.task('default', ['server', 'watch']);


// ================================
// ============= DIST =============
// ================================

// Build
var path = {
  build: {
    blocks: './dist/blocks/',
    html: './dist/',
    jade: './dist/jade/',
    css: './dist/css/',
    less: './dist/less/',
    img: './dist/img/',
    js: './dist/js/'
  },
  src: {
    blocks: './blocks/**/*.*',
    html: ['./*.jade', './*.html'],
    jade: './jade/*.jade',
    css: './css/*.css',
    less: './less/*.less',
    img: './img/*.*',
    js: './js/*.*'
  },
  clean: './dist'
};

// build cleaner
gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('html:build', function () {
  var assets = useref.assets();
  return gulp.src(path.src.html)
    .pipe(assets)
    .pipe(gulpif('*.css', minifyCSS({compatibility: 'ie8'})))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css:build', function () {
  gulp.src(path.src.css)
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('blocks:build', function () {
  gulp.src(path.src.blocks)
    .pipe(gulp.dest(path.build.blocks));
});

gulp.task('less:build', function () {
  gulp.src(path.src.less)
    .pipe(gulp.dest(path.build.less));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js));
});

gulp.task('jade:build', function () {
  gulp.src(path.src.jade)
    .pipe(gulp.dest(path.build.jade));
});

gulp.task('img:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img));
});

gulp.task('dist', ['html:build','js:build', 'less:build', 'jade:build', 'css:build', 'blocks:build', 'img:build']);

gulp.task('build', ['clean', 'jade'], function () {
  gulp.start('dist');
});


// ================================
// ============ DEPLOY ============
// ================================

gulp.task( 'deploy', function() {

  var conn = ftp.create( {
      host: 'a.epixx.ru',
      user: 'epic_assets',
      password: '1TGHryqndKUXNtxnWO0u8JcpTVVS29',
      port: 20,
      parallel: 10,
      log: gutil.log
  } );
  
  var globs = [
      'dist/**/*'
  ];

  return gulp.src(globs, { base: 'dist/', buffer: false })
    .pipe(conn.dest( '/public_html/v4/'));
});
