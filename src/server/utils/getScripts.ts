import env from '../../utils/getEnv';
import getPreLoadingLink from './getPreLoadingLink';
import assetsManifest from './resources/assetsManifest';

const devServerScripts = ['/react.development.js', '/react-dom.development.js'];
const devWebpackScripts = ['/main.js'];
const devScripts = [...devServerScripts, ...devWebpackScripts];
const prodScripts = Object.values(assetsManifest).filter(script => script.endsWith('.js'));

const getPrefix = (script: string): string =>
    __DEV__ ? (devWebpackScripts.includes(script) ? env.STATIC_URL : '') : '';

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
