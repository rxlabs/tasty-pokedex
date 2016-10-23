'use strict'

const fs = require('fs')
const path = require('path')

const del = require('del')
const gitRevSync = require('git-rev-sync')
const ghpages = require('gh-pages')
const runSequence = require('run-sequence')
const gulp = require('gulp')
const gulplog = require('gulplog')
const $ = require('gulp-load-plugins')()

const pkg = require('./package.json')

let paths = {
  src: 'app',
  server: 'server',
  test: 'test',
  container: 'container',
  build: 'public',
  dist: 'dist'
}

paths = Object.assign(paths, {
  html: `${paths.build}/**/*.html`,
  images: `${paths.build}/**/*.{gif,jpg,png}`,
  styles: `${paths.src}/**/*.css`,
  scripts: [
    '*.js',
    `${paths.container}/*.js`,
    `{${paths.src},${paths.server},${paths.test}}/**/*.js`
  ]
})

const dist = {
  client: `${paths.dist}/client`
}

gulp.task('default', [
  'lint',
  'watch'
])

gulp.task('lint', [
  'stylelint',
  'standard'
])

gulp.task('minify', [
  'htmlmin',
  'imagemin'
])

gulp.task('optimize', (done) => (
  runSequence(
    'minify',
    'rev'
  )
))

gulp.task('watch', [
  'watch:html',
  'watch:scripts',
  'watch:flow',
  'watch:styles'
])

gulp.task('clean', () => (
  del([
    paths.build,
    paths.dist
  ])
))

gulp.task('htmlhint', () => (
  gulp.src(paths.html)
    .pipe($.htmlhint())
    .pipe($.htmlhint.failReporter())
))

gulp.task('standard', () => (
  gulp.src(paths.scripts)
    .pipe($.standard())
    .pipe($.standard.reporter('default', {
      breakOnError: true
    }))
))

gulp.task('stylelint', () => (
  gulp.src(paths.styles)
    .pipe($.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
))

gulp.task('watch:html', () => (
  gulp.src(paths.html)
    .pipe($.watch(paths.html, vinyl => {
      if (vinyl.event === 'change') {
        gulplog.info(`Linted ${vinyl.relative}`)
      }
    }))
    .pipe($.plumber())
    .pipe($.htmlhint())
    .pipe($.htmlhint.reporter())
))

gulp.task('watch:scripts', () => (
  gulp.src(paths.scripts)
    .pipe($.watch(paths.scripts, vinyl => {
      if (vinyl.event === 'change') {
        gulplog.info(`Linted ${vinyl.relative}`)
      }
    }))
    .pipe($.plumber())
    .pipe($.standard())
    .pipe($.standard.reporter('default'))
))

gulp.task('watch:flow', () => {
  process.env.FLOW_BIN = './node_modules/.bin/flow'

  return gulp.src(paths.scripts)
    .pipe($.watch(paths.scripts))
    .pipe($.plumber())
    .pipe($.flowtype())
})

gulp.task('watch:styles', () => (
  gulp.watch(paths.styles, ['stylelint'])
))

gulp.task('imagemin', () => (
  gulp.src(paths.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.build))
))

gulp.task('htmlmin', () => (
  gulp.src(paths.html)
    .pipe($.htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(paths.build))
))

gulp.task('rev', () => {
  const dontRev = [
    '404.html',
    'index.html',
    'humans.txt',
    'robots.txt',
    'crossdomain.xml',
    'image.png'
  ]

  return gulp.src(`${paths.build}/**`)
    .pipe($.revAll.revision({
      prefix: typeof process.env.ASSET_PREFIX === 'string'
        ? process.env.ASSET_PREFIX
        : '/tasty-pokedex',
      dontRenameFile: dontRev,
      dontUpdateReference: dontRev
    }))
    .pipe(gulp.dest(dist.client))
})

gulp.task('deploy', (done) => {
  fs.openSync(path.join(dist.client, '.nojekyll'), 'w')

  return ghpages.publish(dist.client, {
    clone: '.deploy',
    depth: 2,
    dotfiles: true,
    message: `Deploy ${gitRevSync.short()} from v${pkg.version} [ci skip]`,
    repo: process.env.DEPLOY_REPO || `git@github.com:${pkg.repository}.git`,
    branch: process.env.DEPLOY_BRANCH || 'gh-pages',
    logger: (message) => {
      console.log(`[ deploy ] ${message}`)
    },
    user: {
      name: process.env.DEPLOY_NAME || pkg.author.name,
      email: process.env.DEPLOY_EMAIL || pkg.author.email
    }
  }, done)
})
