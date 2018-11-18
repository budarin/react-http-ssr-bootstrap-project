const DEV = process.env.NODE_ENV === 'development';

// if (__DEV__)
{
    // tslint:disable-next-line
    const dotenv = require('dotenv');
    const result = dotenv.config();

    if (DEV) {
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
