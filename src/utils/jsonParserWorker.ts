// This stands in for 'worker.js':
// https://stackoverflow.com/questions/10494285/is-delegating-json-parse-to-web-worker-worthwile-in-chrome-extension-ff-addon

const blob = new Blob(
    [
        'this.onmessage = function(message) {\n' +
            'var result; try{ result = JSON.parse(message.data); }catch(err){ result = {}; } \n' +
            'postMessage(result);\n' +
            '};',
    ],
    {
        type: 'text/javascript',
    },
);
const workerUrl = URL.createObjectURL(blob);

// Main script:
const jsonParserWorker = new Worker(workerUrl /*"worker.js"*/);

export default jsonParserWorker;

/* Usage 

import jsonParserWorker from '../utils/jsonParserWorker';

jsonParserWorker.onmessage = message => console.log(message.data);

jsonParserWorker.postMessage(
    '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}',
);

*/
