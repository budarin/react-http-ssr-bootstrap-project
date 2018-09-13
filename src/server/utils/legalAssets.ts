export const legalAssets =
    process.env.NODE_ENV === 'development'
        ? [
              '/client.js.map',
              '/server.js.map',

              '/ress.min.css',
              '/default.css',
              '/client.js',
              '/robots.txt',
              '/favicon.ico',
              '/manifest.json',
              '/android-chrome-192x192.png',
              '/android-chrome-512x512.png',
              '/react.development.js',
              '/react-dom.development.js',
          ]
        : [
              '/server.js.map',
              '/client.js.map',

              '/ress.min.css',
              '/default.css',
              '/client.js',
              '/robots.txt',
              '/favicon.ico',
              '/manifest.json',
              '/android-chrome-192x192.png',
              '/android-chrome-512x512.png',
          ];
