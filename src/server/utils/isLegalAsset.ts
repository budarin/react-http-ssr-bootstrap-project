import assetsManifest from './resources/assetsManifest';

const legalAssets = Object.values(assetsManifest);

function isLegalAsset(assetName: string): boolean {
    return legalAssets.indexOf(assetName) > -1;
}

export default isLegalAsset;
