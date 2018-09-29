import * as React from 'react';
import SimpleText from 'budarin-simple-text';
import SimpleButton from 'budarin-simple-button';

import css, { IStyles } from './app.css';
import MouseCoordinates from './components/MouseCoordinates';
import renderCoordinates from './components/renderCoordinates';
import StyleProvider from './components/StyleProvider';

// tslint:disable-next-line
const btnClickHandler = () => console.log('btn is clicked');
const renserApp = (styles: IStyles): React.ReactNode => {
    return (
        <>
            <span className={styles.hello}>Hello World!</span>
            <MouseCoordinates>{renderCoordinates}</MouseCoordinates>
            <br />
            <SimpleButton text="Кнопка!" onClick={btnClickHandler} />
            <br />
            <SimpleText>Text</SimpleText>
        </>
    );
};
const App: React.SFC = () => {
    return <StyleProvider css={css}>{renserApp}</StyleProvider>;
};

export default App;
