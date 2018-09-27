import debug from 'debug';
import { IncomingMessage } from 'http';

const log = debug('app:server');

function logServerRequest(req: IncomingMessage): void {
    const { url, method } = req;

    log('>> Path:', url, '>> Method:', method);
}

export default logServerRequest;
