import fs from 'fs';
import https from 'https';
import logger from './utils/getServerLogger';

import env from '../../config';
import appServer from './appServer';

const { SERVER_PORT, SERVER_HOST, SERVER_URL, KEYS_FOLDER } = env;

const server = https.createServer(
    {
        ca: fs.readFileSync(`${KEYS_FOLDER}/cacert.crt`),
        cert: fs.readFileSync(`${KEYS_FOLDER}/server.crt`),
        key: fs.readFileSync(`${KEYS_FOLDER}/server.key`),
    },
    appServer,
);

let shootdowning = false;
const shutdown = () => {
    if (shootdowning) {
        return;
    }

    shootdowning = true;
    server.close();
    setTimeout(() => {
        if (__DEV__) {
            // tslint:disable-next-line
            console.log('Closing...');
        }
        process.exit(1);
    }, 1000);
};

// @ts-ignore
process.on('SIGINT', shutdown);
// @ts-ignore
process.on('SIGTERM', shutdown);

process.on('unhandledRejection', err => {
    logger.error(`unhandledRejection: Reason: ${err.message}\n ${err.stack}`);
});

process.on('uncaughtException', err => {
    logger.error('Необработанная ошибка приложения', err.stack);
    process.exit(1);
});

server.listen(SERVER_PORT, SERVER_HOST);

logger.info(`Сервер запущен по адресу: ${SERVER_URL || 'error'}`);
