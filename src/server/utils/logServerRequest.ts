import { IncomingMessage } from 'http';
import logger from './getServerLogger';

function logServerRequest(req: IncomingMessage): void {
    const { url, method } = req;

    logger.info('>> Path:', url, '>> Method:', method);
}

export default logServerRequest;
