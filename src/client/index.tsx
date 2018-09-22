import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/App';

const APP_ROOT_ID = 'root';

function renderApp() {
    let appRoot = document.getElementById(APP_ROOT_ID);

    if (!appRoot) {
        appRoot = document.body.appendChild(document.createElement('div'));
        appRoot.id = APP_ROOT_ID;
    }

    ReactDOM.hydrate(<App />, appRoot, () => {
        const body = document.querySelector('body');

        if (body) {
            body.classList.add('interactive');
        }
    });
}

function cleanUpHTML() {
    const renderSplashScript = document.getElementById('renderSplashScript');
    const removeSplashScript = document.getElementById('removeSplashScript');

    if (renderSplashScript) {
        document.body.removeChild(renderSplashScript);
    }
    if (removeSplashScript) {
        document.body.removeChild(removeSplashScript);
    }
}

if (window.showingSpash) {
    window.renderClient = renderApp;
} else {
    Promise.resolve()
        .then(renderApp)
        .then(cleanUpHTML);
}

if (__DEV__) {
    if (module.hot) {
        module.hot.accept('../common/App', () => {
            renderApp();
        });
    }
}
