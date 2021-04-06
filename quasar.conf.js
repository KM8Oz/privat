// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
// const fs = require('fs')
module.exports = function (ctx) {
  return {
    // preFetch: true,
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: ['addressBar', 'touchs', 'prototype', 'plyr','i18n', 'websocket-client', 'player', 'notification', 'clipboard', 'uploaderv2', 'cropper', 'components', 'uploader'],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.sass'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v4',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // "roboto-font", // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
      'material-icons-outlined'
    ],
    bin: {
      linuxAndroidStudio: '/snap/android-studio/current/android-studio/bin/studio.sh'
    },
    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      // <q-route-tab style="position:absolute;
      // left:0px;" to="/page1" label="Page One" />
      //
      all: 'auto',

      components: ['QImg', 'QBtn'],
      directives: ['TouchSwipe'],

      // Quasar plugins
      plugins: ['AppFullscreen', 'Notify', 'LocalStorage', 'AddressbarColor', 'Cookies', 'SessionStorage']
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: true,
    vendor: {
      // add: […], remove: […]
    },
    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'

      // rtl: false, // https://quasar.dev/options/rtl-support
      // showProgress: false,
   //  gzip: true,
      // analyze: true,
      minify: true,
      sourceMap: true,
      scopeHoisting: true,
    //  analyze: true,
    //  publicPath: '/',
      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // https: true,
      // // http2: true,
      // key: fs.readFileSync('server.key'),
      // cert: fs.readFileSync('server.crt'),
      // ca: fs.readFileSync('server.pem'),
      port: 8080,
      compress: false,
      open: false // opens browser window automatically
    },

    animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    // animations: ["bounceInUp", "bounceOutDown"],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: true
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'InjectManifest', // 'GenerateSW' or 'InjectManifest'
      // workboxOptions: {
      //   skipWaiting: true,
      //   clientsClaim: true
      // }, // only for GenerateSW
      manifest: {
        name: 'CG_Chat',
        short_name: 'CG_Chat',
        description: 'CG Chat',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'https://rec.cg.house/statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'https://rec.cg.house/statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://rec.cg.house/statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'https://cg.house/statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'https://rec.cg.house/statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'com.pcm.app'
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'pcmapp'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
        cfg.module.rules.push({
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          use: [
            { loader: '@kazupon/vue-i18n-loader' },
            { loader: 'yaml-loader' }
          ]
        })
      }
    }
  }
}
