// if (__DEV__)
{
    // tslint:disable-next-line
    const dotenv = require('dotenv');
    const result = dotenv.config();

    if (__DEV__) {
        if (result.error) {
            throw result.error;
        }
    }
}

const {
    SERVER_PROTOCOL,
    SERVER_PORT,
    SERVER_HOST,
    SERVER_URL,
    STATIC_PROTOCOL,
    STATIC_PORT,
    STATIC_HOST,
    STATIC_URL,
    KEYS_FOLDER,
} = process.env;

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

/* tslint:disable object-literal-sort-keys */
const Env: IEnv = {
    // @ts-ignore
    SERVER_PROTOCOL,
    // @ts-ignore
    SERVER_PORT,
    // @ts-ignore
    SERVER_HOST,
    // @ts-ignore
    SERVER_URL,
    // @ts-ignore
    STATIC_PROTOCOL,
    // @ts-ignore
    STATIC_PORT,
    // @ts-ignore
    STATIC_HOST,
    // @ts-ignore
    STATIC_URL,
    // @ts-ignore
    KEYS_FOLDER,
};
/* tslint:enable object-literal-sort-keys */

export default Env;
