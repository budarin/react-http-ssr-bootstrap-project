// if (__DEV__)
{
    // tslint:disable-next-line
    const dotenv = require('dotenv');
    const result = dotenv.config();

    if (result.error) {
        throw result.error;
    }
}

const {
    SERVER_PROTOCOL = 'https',
    SERVER_PORT = 4430,
    SERVER_HOST = 'localhost',
    SERVER_URL = 'https://localhost:4430/',
    STATIC_PROTOCOL = 'https',
    STATIC_PORT = 4440,
    STATIC_HOST = 'localhost',
    STATIC_URL = 'https://localhost:4440/',
    KEYS_FOLDER = 'certs',
} = process.env;

/* tslint:disable object-literal-sort-keys */
const Env = {
    SERVER_PROTOCOL,
    SERVER_PORT,
    SERVER_HOST,
    SERVER_URL,
    STATIC_PROTOCOL,
    STATIC_PORT,
    STATIC_HOST,
    STATIC_URL,
    KEYS_FOLDER,
};
/* tslint:enable object-literal-sort-keys */

export default Env;
