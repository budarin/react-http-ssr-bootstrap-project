import React from 'react';

export interface ICoordinates {
    x: number;
    y: number;
}
export type TMouseEventRenderer = (coordinates: ICoordinates) => JSX.Element | null;

type TProps = Readonly<{ children: TMouseEventRenderer }>;
type TState = Readonly<ICoordinates>;

class MouseCoordinates extends React.Component<TProps, TState> {
    readonly state: TState = { x: 0, y: 0 };

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = (event: MouseEvent): void => {
        const { clientX = 0, clientY = 0 } = event;

        window.requestAnimationFrame(() => {
            this.setState(() => ({
                x: clientX,
                y: clientY,
            }));
        });
    };

    render() {
        const { children } = this.props;
        const isRenderIsFunction = typeof this.props.children === 'function';

        return isRenderIsFunction ? children(this.state) : null;
    }
}

export default MouseCoordinates;
