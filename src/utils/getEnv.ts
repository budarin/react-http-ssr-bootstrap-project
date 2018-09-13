import fs from 'fs';
import path from 'path';
import parseJSON from './parseJSON';

const defaultEnvPath = './.env.json';
const devEnvPath = './.env.development.json';
const prodEnvPath = './.env.production.json';

interface IEnv {
    SERVER_PROTOCOL: string;
    SERVER_PORT: number;
    SERVER_HOST: string;
    SERVER_URL: string;
    STATIC_PROTOCOL: string;
    STATIC_PORT: number;
    STATIC_HOST: string;
    STATIC_URL: string;
    KEYS_FOLDER: string;
}

function getParsedEnv(envPath: string): IEnv {
    return parseJSON(fs.readFileSync(path.resolve(envPath), { encoding: 'utf-8' }));
}

function getEnv(): IEnv {
    if (process.env.NODE_ENV === 'production' && fs.existsSync(prodEnvPath)) {
        return getParsedEnv(prodEnvPath);
    }

    if (process.env.NODE_ENV === 'development' && fs.existsSync(devEnvPath)) {
        return getParsedEnv(devEnvPath);
    }

    if (fs.existsSync(defaultEnvPath)) {
        return getParsedEnv(defaultEnvPath);
    }

    /* tslint:disable object-literal-sort-keys */
    const Env = {
        SERVER_PROTOCOL: 'https',
        SERVER_PORT: 4430,
        SERVER_HOST: 'localhost',
        SERVER_URL: 'https://localhost:4430/',
        STATIC_PROTOCOL: 'https',
        STATIC_PORT: 4440,
        STATIC_HOST: 'localhost',
        STATIC_URL: 'https://localhost:4440/',
        KEYS_FOLDER: 'certs',
    };
    /* tslint:enable object-literal-sort-keys */

    return Env;
}

export default getEnv();
