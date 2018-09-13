const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const width = 1024;
const height = 768;
const CACHE_SIZE = 10000000;
//  выделяем по 10Mb на кэш
const args = [`--media-cache-size=${CACHE_SIZE}`, `--disk-cache-size=${CACHE_SIZE}`];

const launchProps =
    process.env.SHOW_BROWSER && process.env.SHOW_BROWSER.trim() === 'true'
        ? (args.push(`--window-size=${width},${height}`),
          {
              headless: false,
              slowMo: 200,
              // userDataDir: './.tmp/chrome/user-data-dir',
              args: args,
          })
        : { args: args };

module.exports = async function() {
    const browser = await puppeteer.launch(launchProps);

    global.browser = browser;
    fs.writeFileSync(path.resolve('.tmp/jest/puppeteer-tests/wsEndpoint'), browser.wsEndpoint());
};
