import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {TVShowList} from './App';
import './index.css';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <TVShowList />
    </Provider>,
  document.getElementById('root')
);
