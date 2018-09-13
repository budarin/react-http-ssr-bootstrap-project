import * as mime from 'mime-types';

export interface IFile {
    path: string;
    filePath: string;
    headers: { [name: string]: number | string | string[] | undefined };
}

function getFileDescription(fileName: string): IFile {
    return {
        filePath: `./${fileName}`,
        headers: { 'content-type': mime.lookup(fileName) || '' },
        path: `/${fileName}`,
    };
}

export default getFileDescription;
