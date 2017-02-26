/**
 * Created by verbi on 26/02/2017.
 */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import '../index.css';
import TVApp from './tvshows';

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <TVApp />
            </Provider>
        )
    }
}