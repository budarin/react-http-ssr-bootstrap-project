import debug from 'debug';
import * as React from 'react';
import { renderToString } from 'react-dom/server'; // tslint:disable-line
import { ServerRequest, ServerResponse } from 'http'; // tslint:disable-line

import App from '../../common/App';
import renderHTMLHeader from './renderHTMLHeader';
import renderHTMLBottom from './renderHTMLBottom';
import renderRemoveSplashScript from './renderRemoveSplashSript';

const log = debug('app:server');
const headers = {
    'Content-Type': 'text/html; charset=utf-8',
};

// @ts-ignore
async function renderApp(req: ServerRequest, res: ServerResponse): Promise<any> {
    log('>> Render app');

    res.writeHead(200, headers);
    res.write(renderHTMLHeader());

    const SSRTimeout = 20;

    await new Promise(resolve => {
        setTimeout(() => resolve(true), SSRTimeout);
    }).then(() => {
        log('>> Render app content');

        const appString = renderToString(<App />);

        res.write(renderRemoveSplashScript);
        res.write(appString);
        res.end(renderHTMLBottom);
    });
}

export default renderApp;
