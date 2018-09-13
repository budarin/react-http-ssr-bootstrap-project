import debug from 'debug';
import { ServerRequest } from 'http';

const log = debug('app:server');

function logServerRequest(req: ServerRequest): void {
    const { url, method } = req;

    log('>> Path:', url, '>> Method:', method);
}

export default logServerRequest;
