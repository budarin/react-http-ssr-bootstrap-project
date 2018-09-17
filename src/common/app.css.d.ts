declare interface ILocals {
  readonly 'hello': string;
}

export interface IAppCss {
  readonly locals: ILocals;
  readonly use: Function;
  readonly unuse: Function;
  readonly source: string;
  readonly 'hello': string;
}

declare const styles: IAppCss;

export default styles;