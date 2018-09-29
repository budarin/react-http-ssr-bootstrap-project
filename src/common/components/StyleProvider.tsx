import React from 'react';

interface IBrowser {
    use: Function; // tslint:disable-line
    unuse: Function; // tslint:disable-line
    locals: IStringHash;
}

interface IServer {
    source: string;
    [key: string]: string; // tslint:disable-line
}

interface IStyleProviderProps {
    css: IBrowser & IServer;
    children: (styles: IStringHash) => React.ReactNode;
}

class StyleProvider extends React.Component<IStyleProviderProps> {
    constructor(props: IStyleProviderProps) {
        super(props);

        // const { children } = this.props;

        // if (typeof children !== 'function') {
        //     throw new Error('Children should be a function (styles: IStringHash) => any');
        // }
    }

    componentWWillMount() {
        if (__BROWSER__) {
            const { css } = this.props;

            if (typeof css.use === 'function') {
                css.use();
            }
        }
    }

    render() {
        let styles = {};
        const { css } = this.props;

        if (__BROWSER__) {
            styles = css.locals;
        }
        if (__SERVER__) {
            const { source, ...rest } = css;

            styles = rest;
        }
        return this.props.children(styles);
    }
}

export default StyleProvider;
