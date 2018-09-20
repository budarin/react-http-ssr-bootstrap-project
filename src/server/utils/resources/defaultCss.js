// @preval
// @ts-nocheck
const fs = require('fs');
const text = fs.readFileSync('src/common/default.css', 'utf-8');
const defaultCss = process.env.NODE_ENV === 'production' ? text.replace(/\r\n/g, '').replace(/\n/g, '') : text;

module.exports = defaultCss;
