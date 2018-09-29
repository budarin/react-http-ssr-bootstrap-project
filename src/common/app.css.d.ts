export interface IStyles {
    readonly hello: string;
}

export interface IAppCss {
    readonly locals: IStyles;
    readonly use: Function;
    readonly unuse: Function;
    readonly source: string;
    readonly hello: string;
}

declare const styles: IAppCss;

export default styles;
