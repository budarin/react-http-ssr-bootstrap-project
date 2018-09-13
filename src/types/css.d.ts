/* 
* декларируем .css модуль
*/

export interface IClassHash {
    [name: string]: string;
}

export interface ICssModule {
    use: Function;
    unuse: Function;
    ref: Function;
    unref: Function;
    locals: IClassHash;
}

export interface IStringifyable {
    toString(): string;
}
declare module '*.css' {
    const styles: IClassHash & IStringifyable & ICssModule;
    export default styles;
}
