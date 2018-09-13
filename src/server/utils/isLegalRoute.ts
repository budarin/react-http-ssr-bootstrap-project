import { ServerRequest } from 'http';

import { legalRoutes } from './legalRoutes';

function isLegalRoute(req: ServerRequest): boolean {
    const route = (req.url || '').split('?')[0];

    return legalRoutes.indexOf(route) > -1;
}

export default isLegalRoute;
