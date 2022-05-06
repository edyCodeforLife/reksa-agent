import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css, StyleSheet } from 'aphrodite';
import { BrowserRouter } from 'react-router-dom';

import AppRoute from './appRoute';
import { AppState } from './appState';

export const styles = StyleSheet.create({
    global: {
        fontFamily: 'sans-serif',
        boxSizing: 'border-box'
    },
});

const App = () => (
    <AppState>
        <AppRoute />
    </AppState>
);

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,

    document.getElementById('app')
);
