import { legalAssets } from './legalAssets';

function isLegalAsset(assetName: string): boolean {
    return legalAssets.indexOf(assetName) > -1;
}

export default isLegalAsset;
