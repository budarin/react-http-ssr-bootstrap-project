const path = require('path');

module.exports = {
    plugins: [
        require('postcss-mixins')({
            mixinsDir: path.resolve('src/common/mixins'),
        }),
        require('postcss-preset-env')({
            stage: 3,
            features: {
                'nesting-rules': true,
            },
            autoprefixer: {
                grid: true,
            },
        }),
    ],
};
