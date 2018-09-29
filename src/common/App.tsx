import * as React from 'react';
import SimpleText from 'budarin-simple-text';
import SimpleButton from 'budarin-simple-button';

import appStyles from './app.css';
import MouseCoordinates from './components/MouseCoordinates';
import renderCoordinates from './components/renderCoordinates';

const css = __BROWSER__ ? appStyles.locals : appStyles;

class App extends React.Component {
    // tslint:disable-next-line
    btnClickHandler = () => console.log('btn is clicked');

    componentWillMount() {
        if (__BROWSER__) {
            appStyles.use();
        }
    }

    render() {
        return (
            <>
                <span className={css.hello}>Hello World!</span>

                <MouseCoordinates>{renderCoordinates}</MouseCoordinates>
                <br />
                <SimpleButton text="Кнопка!" onClick={this.btnClickHandler} />
                <br />
                <SimpleText>Text</SimpleText>
            </>
        );
    }
}

export default App;
