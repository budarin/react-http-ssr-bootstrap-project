import path from 'path';
import debug from 'debug';
import http2, { ServerHttp2Stream } from 'http2'; // tslint:disable-line

import { IFile } from './getFileDescription';
import serverRootPath from './serverRootPath';
import respondToStreamError from './respondToStreamError';

const log = debug('app:server');
const { HTTP2_HEADER_PATH } = http2.constants;

const pushAsset = (stream: ServerHttp2Stream, file: IFile): void => {
    stream.pushStream(
        { [HTTP2_HEADER_PATH]: file.path },
        // @ts-ignore
        { parent: stream.id },
        (err: Error | null, pushStream: ServerHttp2Stream) => {
            if (err) {
                log('>> Pushing error:', file.path, '\n', err);

                return;
            }

            log('>> Pushing:', file.path);

            pushStream.on('error', (err1: Error) => respondToStreamError(err1, pushStream, file.filePath));

            const absFilePath = path.resolve(path.join(serverRootPath, file.filePath));

            try {
                pushStream.respondWithFile(absFilePath, file.headers);
            } catch (err) {
                log('pushing error', file.path, '\n', err);
            }
        },
    );
};

export default pushAsset;
