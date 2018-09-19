// @preval
// @ts-nocheck
const fs = require('fs');
const ressCss = fs.readFileSync('node_modules/ress/dist/ress.min.css', 'utf-8');

module.exports = ressCss;
