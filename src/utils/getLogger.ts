import pino from 'pino';

const pinoOptions = __DEV__ ? { prettyPrint: { colorize: true } } : {};
// @ts-ignore
const logger = pino(pinoOptions);

export default logger;
