// https://m.habr.com/post/423693/
import * as webpack from 'webpack';

export interface IChunkDescription {
    readonly id: string | number;
    readonly name: string;
    readonly files: string[];
}

export interface IEntrypointsPluginOptions {
    readonly filename: string;
    readonly replacer?: (key: string, value: any) => any;
    readonly space?: string | number;
    readonly filter?: (chunk: IChunkDescription) => boolean;
}

export default class EntrypointsPlugin {
    private readonly options: IEntrypointsPluginOptions;

    constructor(options: IEntrypointsPluginOptions) {
        this.options = {
            ...{
                filename: 'entrypoints.json',
                replacer: null,
                space: null,
                filter: null,
            },
            ...options,
        };
    }

    apply(compiler: webpack.Compiler): void {
        compiler.hooks.emit.tap('entrypoints', (compilation: webpack.compilation.Compilation) => {
            const data = {};
            const entrypoints = {};

            const filter = this.options.filter;
            const publicPath = compilation.compiler.options.output.publicPath;

            for (const [key, value] of compilation.entrypoints.entries()) {
                const chunks: IChunkDescription[] = value.chunks.map(chunkData => {
                    const chunk: IChunkDescription = {
                        id: chunkData.id,
                        name: chunkData.name,
                        files: chunkData.files,
                    };
                    return filter == null || filter(chunk) ? chunk : null;
                });
                const getNotNullChunks = chunk => chunk != null;
                const getFilesInChunk = (chunk: IChunkDescription): string[] =>
                    chunk.files.reduce((acc: string[], file: string) => {
                        if (!['map', 'gz'].includes(file.split('.').pop())) {
                            acc.push(publicPath + file);
                        }
                        return acc;
                    }, []);
                const files = ([] as string[]).concat(...chunks.filter(getNotNullChunks).map(getFilesInChunk));

                data[key] = files;
            }
            const json = JSON.stringify(data, this.options.replacer, this.options.space);

            // here we can get asset size fo entry point to sort by size or include size or priority into entrypoint
            // console.log('\n\nassets', Object.keys(compilation.assets));

            compilation.assets[this.options.filename] = {
                source: () => json,
                size: () => json.length,
            };
        });
    }
}
