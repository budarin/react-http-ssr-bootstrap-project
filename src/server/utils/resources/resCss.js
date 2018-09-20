// @preval
// @ts-nocheck
const fs = require('fs');
const text = fs.readFileSync('node_modules/ress/dist/ress.min.css', 'utf-8');
const ressCss = process.env.NODE_ENV === 'production' ? text.replace(/\r\n/g, '').replace(/\n/g, '') : text;

module.exports = ressCss;
