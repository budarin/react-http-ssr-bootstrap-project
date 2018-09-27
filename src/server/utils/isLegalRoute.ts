import { IncomingMessage } from 'http';

import { legalRoutes } from './legalRoutes';

function isLegalRoute(req: IncomingMessage): boolean {
    const route = (req.url || '').split('?')[0];

    return legalRoutes.indexOf(route) > -1;
}

export default isLegalRoute;
