import debug from 'debug';

const log = debug('app:parse:JSON');
/*
* Safe parsing JSON
* */
function parseJSON(JSONString: string) {
    try {
        return JSON.parse(decodeURIComponent(JSONString));
    } catch (ex) {
        log('Ошибка разбора JSON строки:', JSONString, '->', ex.message);

        return {};
    }
}

export default parseJSON;
