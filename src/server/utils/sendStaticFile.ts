import fs from 'fs';
import path from 'path';
import debug from 'debug';
import * as mime from 'mime-types';
import { IncomingMessage, ServerResponse } from 'http';

import isLegalAsset from './isLegalAsset';
import serverRootPath from './serverRootPath';

const log = debug('app:server');
const logError = debug('app:server:error');

function sendStaticFile(req: IncomingMessage, res: ServerResponse): void {
    const { url = '' } = req;
    const filePath = path.resolve(path.join(serverRootPath, url));

    // console.log(`\nsendStaticFile: ${filePath}\n`);

    if (__PROD__ && !isLegalAsset(url)) {
        log('>> Illegal static file:', url);

        return;
    }

    fs.exists(filePath, exists => {
        if (exists) {
            log('>> Static file:', req.url);

            res.writeHead(200, {
                'content-type': mime.lookup(url) || '',
            });

            fs.createReadStream(filePath).pipe(res);
        } else {
            logError('>> Static file is absent:', req.url);
        }
    });
}

export default sendStaticFile;
