export interface IAppCss {
    readonly locals: {
        readonly hello: string;
    };
    readonly use: Function;
    readonly unuse: Function;
    readonly source: string;
    readonly hello: string;
}

declare const styles: IAppCss;

export default styles;
