import { ServerRequest, ServerResponse } from 'http'; // tslint:disable-line

import renderApp from './utils/renderApp';
import isLegalRoute from './utils/isLegalRoute';
import sendStaticFile from './utils/sendStaticFile';
import logServerRequest from './utils/logServerRequest';

const app = async (req: ServerRequest, res: ServerResponse) => {
    logServerRequest(req);

    if (req.url === '/ping') {
        res.writeHead(200, { 'content-type': 'text' });
        res.end(Date.now().toString());
        return;
    }

    if (isLegalRoute(req)) {
        return renderApp(req, res);
    }

    if (process.env.__DEV__) {
        // handle static files for non pushed assets
        // nginx will do it in production
        sendStaticFile(req, res);
    }
};

export default app;
