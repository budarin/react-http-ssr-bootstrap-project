import { IncomingHttpHeaders } from 'http2'; // tslint:disable-line
import getPreLoadingLink from './getPreLoadingLink';

/*
* Add Link field to http headers for pre loading resources
* */
const preLoadingResources = ['/default.css', '/client.js'].map(getPreLoadingLink);

function addPreLoadsToHeaders(headers: IncomingHttpHeaders): void {
    headers['Link'] = preLoadingResources.join(','); // tslint:disable-line no-string-literal
}

export default addPreLoadsToHeaders;
