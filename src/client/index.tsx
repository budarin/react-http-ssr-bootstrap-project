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

    return true;
}

function startApp() {
    Promise.resolve(true)
        .then(cleanUpHTML)
        .then(renderApp);
}

function cleanUpHTML() {
    // clear HEAD & body from temporary content

    delete window.renderClient;
}

if (window.showingSpash) {
    window.renderClient = startApp;
} else {
    startApp();
}

if (__DEV__) {
    if (module.hot) {
        module.hot.accept('../common/App', () => {
            renderApp();
        });
    }
}
