import debug from 'debug';
import http2, { ServerHttp2Stream } from 'http2'; // tslint:disable-line

const log = debug('app:server');
const { HTTP_STATUS_NOT_FOUND, NGHTTP2_REFUSED_STREAM, HTTP_STATUS_INTERNAL_SERVER_ERROR } = http2.constants;

export default function respondToStreamError(err: any, stream: ServerHttp2Stream, file: string): void {
    log('respondToStreamError', file, '\n', err);

    const isRefusedStream = err.code === 'ERR_HTTP2_STREAM_ERROR' && stream.rstCode === NGHTTP2_REFUSED_STREAM;

    if (isRefusedStream || stream.closed) {
        return;
    }

    if (err.code === 'ENOENT') {
        stream.respond({ ':status': HTTP_STATUS_NOT_FOUND });
    } else {
        stream.respond({ ':status': HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }

    stream.end();
}
