/* global require, module */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';

import Root from './Root';

if (process.env.NODE_ENV === 'development') {
  require('./dev-only.css');
}

const rootEl = document.getElementById('app-container');

render(<Root store={configureStore} />, rootEl);
