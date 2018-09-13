import fs from 'fs';
import path from 'path';
import debug from 'debug';
import * as mime from 'mime-types';
import { ServerResponse, ServerRequest } from 'http';

import isLegalAsset from './isLegalAsset';
import serverRootPath from './serverRootPath';

const log = debug('app:server');

function sendStaticFile(req: ServerRequest, res: ServerResponse): void {
    const { url = '' } = req;
    const filePath = path.resolve(path.join(serverRootPath, url));

    // console.log(`\nsendStaticFile: ${filePath}\n`);

    if (!isLegalAsset(url)) {
        log('>> Illegal static file:', url);

        return;
    }

    log('>> Static file:', req.url);

    res.writeHead(200, {
        'content-type': mime.lookup(url) || '',
    });

    fs.createReadStream(filePath).pipe(res);
}

export default sendStaticFile;
