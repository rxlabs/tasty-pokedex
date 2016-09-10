module.exports = function (config) {
  let browsers = [
    'Chrome'
  ]

  if (process.env.TRAVIS) {
    browsers = [
      'Chrome_travis_ci'
    ]
  }

  config.set({
    port: process.env.KARMA_PORT || 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    logLevel: config.LOG_INFO,

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browsers: browsers,

    reporters: [
      'progress'
    ],

    frameworks: [
      'fixture',
      'mocha',
      'chai'
    ],

    preprocessors: {
      'test/**/*.js': ['babel'],
      '**/*.html': ['html2js'],
      '**/*.json': ['json_fixtures']
    },

    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },

    files: [
      'public/app.js',
      'test/**/*.test.js',
      'test/fixtures/**/*.html',
      'test/fixtures/**/*.json'
    ]
  })
}
