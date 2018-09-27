import * as React from 'react';
import { renderToString } from 'react-dom/server'; // tslint:disable-line
import { IncomingMessage, ServerResponse } from 'http'; // tslint:disable-line
import logger from '../../utils/getLogger';

import App from '../../common/App';
import renderHTMLHeader from './renderHTMLHeader';
import renderHTMLBottom from './renderHTMLBottom';
import renderRemoveSplashScript from './renderRemoveSplashSript';

// tslint:disable-next-line
const headers = {
    'Content-Type': 'text/html; charset=utf-8',
};

// @ts-ignore
async function renderApp(req: IncomingMessage, res: ServerResponse): Promise<any> {
    logger.info('>> Render app');

    res.writeHead(200, headers);
    res.write(renderHTMLHeader());

    const SSRTimeout = 20;

    // give some time to initial render other requests
    await new Promise(resolve => {
        setTimeout(() => resolve(true), SSRTimeout);
    }).then(() => {
        logger.info('>> Render app content');

        const appString = renderToString(<App />);

        // wait rendering App
        res.write(renderRemoveSplashScript);
        res.write('<main id="root">');
        res.write(appString);
        res.end(renderHTMLBottom);
    });
}

export default renderApp;
