import fs from 'fs';
import path from 'path';
import * as mime from 'mime-types';
import logger from '../../utils/getLogger';
import { IncomingMessage, ServerResponse } from 'http';

import isLegalAsset from './isLegalAsset';
import serverRootPath from './serverRootPath';

function sendStaticFile(req: IncomingMessage, res: ServerResponse): void {
    const { url = '' } = req;
    const filePath = path.resolve(path.join(serverRootPath, url));

    // console.log(`\nsendStaticFile: ${filePath}\n`);

    if (__PROD__ && !isLegalAsset(url)) {
        logger.info('>> Illegal static file:', url);

        return;
    }

    fs.exists(filePath, exists => {
        if (exists) {
            logger.info('>> Static file:', req.url);

            res.writeHead(200, {
                'content-type': mime.lookup(url) || '',
            });

            fs.createReadStream(filePath).pipe(res);
        } else {
            logger.error('>> Static file is absent:', req.url);
        }
    });
}

export default sendStaticFile;
