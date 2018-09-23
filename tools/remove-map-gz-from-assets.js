const fs = require('fs');
const path = require('path');

const manifestFile = fs.readFileSync(path.resolve('dist/assets-manifest.json'), 'utf-8');
const manifest = JSON.parse(manifestFile);
const keys = Object.keys(manifest);

for (const key of keys) {
    // @ts-ignore
    const value = manifest[key];

    if (value.endsWith('.gz') || value.endsWith('.map')) {
        // @ts-ignore
        delete manifest[key];
    }
}

fs.writeFileSync(path.resolve('dist/assets-manifest.json'), JSON.stringify(manifest, null, 2), { encoding: 'utf-8' });
