exports.config = {
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

  plugins: {
    babel: require('./package.json').babel,

    postcss: {
      modules: {
        generateScopedName: require('./package.json').babel.env.node.plugins
          .find(p => (
            typeof p !== 'string' && p[0] === 'css-modules-transform')
          )[1].generateScopedName
      },
      processors: [
        require('postcss-import')(),
        require('postcss-cssnext')()
      ]
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
