/*
* Safe parsing JSON
* */
function parseJSON(JSONString: string) {
    try {
        return JSON.parse(decodeURIComponent(JSONString));
    } catch (ex) {
        if (__BROWSER__) {
            // tslint:disable-next-line
            console.log('Ошибка разбора JSON строки:', JSONString, '->', ex.message);
        }
        if (__SERVER__) {
            const logger = require('../utils/getLogger');

            logger.error('Ошибка разбора JSON строки:', JSONString, '->', ex.message);
        }

        return {};
    }
}

export default parseJSON;
