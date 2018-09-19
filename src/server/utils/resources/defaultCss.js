// @preval
// @ts-nocheck
const fs = require('fs');
const ressCss = fs.readFileSync('src/common/default.css', 'utf-8');

module.exports = ressCss;
