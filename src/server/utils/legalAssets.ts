export const legalAssets =
    process.env.NODE_ENV === 'development'
        ? [
              '/react.development.js',
              '/react-dom.development.js',
              '/client.js',

              '/robots.txt',
              '/favicon.ico',
              '/manifest.json',
              '/android-chrome-192x192.png',
              '/android-chrome-512x512.png',
          ]
        : [
              '/runtime.js',
              '/npm.object-assign.js',
              '/npm.css-loader.js',
              '/npm.style-loader.js',
              '/npm.babel.js',
              '/npm.budarin.js',
              '/npm.react.js',
              '/npm.react-dom.js',
              '/client.js',

              '/runtime.js.map',
              '/npm.object-assign.js.map',
              '/npm.css-loader.js.map',
              '/npm.style-loader.js.map',
              '/npm.babel.js.map',
              '/npm.budarin.js.map',
              '/npm.react.js.map',
              '/npm.react-dom.js.map',

              '/server.js.map',
              '/client.js.map',

              '/robots.txt',
              '/favicon.ico',
              '/manifest.json',
              '/android-chrome-192x192.png',
              '/android-chrome-512x512.png',
          ];
