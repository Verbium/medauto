/**
 * Created by verbi on 26/02/2017.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from '../configureStore';
import '../index.css';
import TVApp from './tvshows';
injectTapEventPlugin();

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <TVApp />
                </Provider>
            </MuiThemeProvider>
        )
    }
}