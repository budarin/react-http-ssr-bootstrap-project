const resourceTypes: IStringHash = {
    css: 'style',
    js: 'script',
};

function getPreLoadingLink(resourcePath: string): string {
    const ext = resourcePath.split('.').pop();
    const resourceType = ext && resourceTypes[ext];

    return `<link rel="preload" href="${resourcePath}" as="${resourceType}" >`;
}

export default getPreLoadingLink;
