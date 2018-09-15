by default:

```ts
declare interface IAppCss {
    readonly hello: string;
}

export const styles: IAppCss;
```

namedExport:

```ts
declare interface IAppCss {
    readonly hello: string;
}
export const hello: string;
export const styles: IAppCss;
```

modules:

```ts
declare interface ILocals {
    readonly hello: string;
}
declare interface IAppCss {
    readonly hello: string;
    readonly locals: ILocals;
}
declare const styles: IAppCss;

export default styles;
```

namedExport + modules:

```ts
declare interface ILocals {
    readonly hello: string;
}
declare interface IAppCss {
    readonly hello: string;
    readonly locals: ILocals;
}

export const hello: string;
export const locals: ILocals;

declare const styles: IAppCss;

export default styles;
```

namedExport + modules + usable:
(usablle only when modules===true)

```ts
declare interface ILocals {
    readonly hello: string;
}
declare interface IAppCss {
    readonly hello: string;
    readonly locals: ILocals;
    readonly use: Function;
    readonly unuse: Function;
}

export const hello: string;
export const locals: ILocals;
export const use: Function;
export const unuse: Function;

declare const styles: IAppCss;

export default styles;
```
