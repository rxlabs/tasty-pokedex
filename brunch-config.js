exports.config = {
  npm: {
    styles: {
      'sanitize.css': ['sanitize.css']
    }
  },

  conventions: {
    ignored: [
      /[\\/]_/,
      /\.spec\.js$/,
      /\.test\.js$/
    ]
  },

  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^vendor/
      },
      entryPoints: {
        'app/index.js': 'app.js'
      }
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  },

  server: {
    hostname: '0.0.0.0'
  },

  overrides: {
    production: {
      plugins: {
        postcss: {
          processors: [
            require('autoprefixer'),
            require('cssnano')
          ]
        }
      }
    }
  },

  plugins: {
    babel: require('./package.json').babel,

    postcss: {
      processors: [
        require('autoprefixer')
      ]
    },

    sass: {
      options: {
        includePaths: ['node_modules']
      }
    },

    static: {
      processors: [
        require('html-brunch-static')({
          handlebars: {
            enableProcessor: true,
            helpers: {
              urlprefix () {
                const url = process.env.DOMAIN || 'rxlabs.github.io'
                const baseurl = typeof process.env.BASEURL === 'string'
                  ? process.env.BASEURL
                  : '/tasty-pokedex'
                return `https://${url}${baseurl}`
              },
              join (context, block) {
                return context.join(block.hash.delimiter)
              },
              updated_time () {
                return new Date().toISOString()
              }
            }
          }
        })
      ]
    }
  }
}
