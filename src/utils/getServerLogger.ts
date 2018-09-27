import pino from 'pino';

// const pinoOptions = __DEV__ ? { prettyPrint: { colorize: true } } : {};
// @ts-ignore
// const logger = pino(pinoOptions);

const dest = pino.extreme(); // logs to stdout with no args
const logger = pino(dest);

// asynchronously flush every 10 seconds to keep the buffer empty
// in periods of low activity
setInterval(() => logger.flush(), 10000).unref();

// use pino.final to create a special logger that
// guarantees final tick writes
// @ts-ignore
const handler = pino.final(logger, (err, finalLogger, evt) => {
    finalLogger.info(`${evt} caught`);
    if (err) {
        finalLogger.error(err, 'error caused exit');
    }
    process.exit(err ? 1 : 0);
});
// catch all the ways node might exit
process.on('beforeExit', () => handler(null, 'beforeExit'));
process.on('exit', () => handler(null, 'exit'));
process.on('uncaughtException', err => handler(err, 'uncaughtException'));
process.on('SIGINT', () => handler(null, 'SIGINT'));
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
process.on('SIGTERM', () => handler(null, 'SIGTERM'));

export default logger;
