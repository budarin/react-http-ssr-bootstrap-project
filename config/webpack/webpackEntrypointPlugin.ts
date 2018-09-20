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

                const files = ([] as string[]).concat(
                    ...chunks.filter(c => c != null).map(c => c.files.map(f => publicPath + f)),
                );
                const js = files.filter(f => /.js/.test(f) && !/.js.map/.test(f));
                const css = files.filter(f => /.css/.test(f) && !/.css.map/.test(f));

                const entrypoint = {};

                if (js.length) {
                    entrypoint['js'] = js;
                }
                if (css.length) {
                    entrypoint['css'] = css;
                }

                data[key] = entrypoint;
            }
            const json = JSON.stringify(data, this.options.replacer, this.options.space);

            compilation.assets[this.options.filename] = {
                source: () => json,
                size: () => json.length,
            };
        });
    }
}
