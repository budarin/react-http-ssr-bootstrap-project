import { IncomingHttpHeaders } from 'http2'; // tslint:disable-line
import getPreLoadingLink from './getPreLoadingLink';

/*
* Add Link field to http headers for pre loading resources
* */
const preLoadingResources = ['/ress.min.css', '/default.css', '/client.js'].map(getPreLoadingLink);

function addPreLoadsToHeaders(headers: IncomingHttpHeaders): void {
    if (process.env.__PROD__) {
        headers['Link'] = preLoadingResources.join(','); // tslint:disable-line no-string-literal
    }
}

export default addPreLoadsToHeaders;
