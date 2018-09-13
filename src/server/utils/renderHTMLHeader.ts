import branch from 'git-branch';
import env from '../../utils/getEnv';
import disableDevToolsInProduction from '../../utils/disableDevToolsInProduction';
import * as packageJson from '../../../package.json';

const branchName = branch.sync();
const version = (packageJson as any).version;

const reactDevModules =
    process.env.NODE_ENV === 'development'
        ? `<script src="/react.development.js" defer></script>
    <script src="/react-dom.development.js" defer></script>`
        : '';
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 504.124 504.124" style="width:100px;height:100px"><path d="M15.754 133.909l236.308 118.154L488.37 133.909v252.062L252.062 504.123 15.754 385.969v-252.06z" fill="#db5449"/><path d="M15.754 157.538v73.649l235.52 115.397 237.095-115.791v-73.255L252.062 273.33 15.754 157.538z" fill="#c54b42"/><path d="M252.062 504.123v-252.06L31.508 141.786H15.754v244.185l236.308 118.152z" fill="#d05045"/><path d="M15.754 157.538v73.649l235.52 115.397.788-.394v-73.255.394L15.754 157.538z" fill="#bb483e"/><path d="M0 125.638L252.062.001l252.062 125.637v16.542L252.062 267.815 0 142.573v-16.935z" fill="#eb6258"/><path d="M396.603 39.779c-8.271-14.966-25.994-24.025-46.868-24.025-47.655 0-81.132 44.505-97.674 72.862-16.542-28.357-50.412-72.468-97.674-72.468-30.326 0-51.988 18.511-51.988 43.717 0 44.898 49.231 74.043 148.086 74.043s151.237-37.415 151.237-73.649c.001-7.089-1.574-14.178-5.119-20.48zM164.628 88.223c-11.028-7.483-14.966-15.754-14.966-21.268 0-6.695 6.302-11.815 15.36-11.815 21.268 0 38.203 27.963 47.655 47.262-24.812-1.97-39.385-8.666-48.049-14.179zm174.867 0c-8.665 5.514-23.237 12.209-48.049 14.178 9.058-19.298 25.994-47.262 47.655-47.262 9.058 0 15.36 5.12 15.36 11.815.001 5.515-3.938 13.785-14.966 21.269z" fill="#efefef"/><path d="M0 126.032l252.062 123.274 252.062-123.274v81.526l-252.85 123.274L0 207.558v-81.526z" fill="#e2574c"/><path d="M346.585 213.859v-9.058l-94.523-51.2-94.523 51.2v9.058L94.524 186.29v-12.603l154.387-81.526 3.151 1.575 3.151-1.575L409.6 173.293v12.603l-63.015 27.963z" fill="#efefef"/><path d="M346.585 204.801v251.668l63.015-31.508V173.293l-63.015 31.508z" fill="#dcdcdc"/><path d="M94.523 425.354l63.015 31.508V205.195l-63.015-31.902v252.061z" fill="#d1d1d1"/></svg>`;

function renderHTMLHeader(): string {
    // TODO: fixme <link rel="preload" href="/manifest.json" as="fetch">

    return `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="version" content="${version}">
            <meta name="branch" content="${branchName}">
            <meta name="theme-color" content="#E6492F">
            <title>React SSR project</title>
            <meta name="Description" content="Simple SSR React project.">
            <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width, Downlink">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes,shrink-to-fit=no">
            <link rel="manifest" href="/manifest.json">
            
            <link rel="stylesheet" type="text/css" href="/ress.min.css" />
            <link rel="stylesheet" type="text/css" href="/default.css" />
            ${disableDevToolsInProduction}
            ${reactDevModules}
            <script src="${env.STATIC_URL}client.js" defer></script>
        </head>
        <body>
            <main id="root">
            <script>
                window.clearTimeout(window.splashTimer);

                window.splashTimer = setTimeout(() => {
                    const rootEl = document.getElementById('root');
                    const splash = document.createElement('div');
                    splash.id = 'splash';
                    splash.style = 'height: 100%; display: flex; align-items: center; justify-content: center';
                    splash.innerHTML = '${svgIcon}';
                    rootEl.append(splash);
                    window.showingSpash = true;
                    
                    window.clearTimeout(window.clearSplashTimer);
                    window.clearSplashTimer = setTimeout(() => {
                        if (window.onEndOfShowingSplash) {
                            window.onEndOfShowingSplash();

                            if (window.renderClient) {
                                window.renderClient();
                                delete window.renderClient;
                            }
                        }

                        window.showingSpash = false;
                    }, 400);
                }, 250);
            </script>
            `;
}

export default renderHTMLHeader;
