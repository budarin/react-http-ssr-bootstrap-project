import env from '../../utils/getEnv';
import getPreLoadingLink from './getPreLoadingLink';

const devServerScripts = ['react.development.js', 'react-dom.development.js'];
const devWebpackScripts = ['client.js'];
const devScripts = [...devServerScripts, ...devWebpackScripts];

const prodScripts = [
    'npm.react.js',
    'npm.react-dom.js',
    'npm.object-assign.js',
    'npm.css-loader.js',
    'npm.style-loader.js',
    'npm.babel.js',
    'npm.budarin.js',
    'runtime.js',
    'client.js',
];

const getPrefix = (script: string): string =>
    __DEV__ ? (devWebpackScripts.includes(script) ? env.STATIC_URL : '/') : '/';

const StringsToScripts = (scripts: string[]): string => {
    return scripts.map(script => `<script src="${getPrefix(script)}${script}" defer></script>`).join('\n');
};

const StringsToPreloadLinks = (scripts: string[]): string => {
    return scripts.map(script => getPreLoadingLink(`${getPrefix(script)}${script}`)).join('\n');
};

const getScriptsBlock = (scripts: string[]): string => {
    return [StringsToPreloadLinks(scripts), StringsToScripts(scripts)].join('\n\n');
};

const getScripts = __DEV__ ? getScriptsBlock(devScripts) : getScriptsBlock(prodScripts);

export default getScripts;
