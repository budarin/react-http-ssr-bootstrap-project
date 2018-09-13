const config = require('../webpack/client/babelLoaderConfig');

config.cacheDirectory = '.tmp/jest';

if (!config.presets[0][1]) {
    throw '1й preset в babelConfig должен быть "env" с параметром "modules: false" !';
}

// modify env preset modules type to commonjs for jest
config.presets[0][1].modules = 'commonjs';
config.presets[0][1].debug = false;

module.exports = require('babel-jest').createTransformer(config);
