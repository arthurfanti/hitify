import "babel-polyfill"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { css } from 'glamor';
import rootReducer from './reducers'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

css.global('html', {
  margin: 0,
  padding: 0,
  fontFamily: '"Work Sans", sans-serif',
  color: '#EEE',
  background: '#111',
  boxShadow: 'inset 0 5vh 60vh -6vh black',
  minHeight: '100vh',
  overflowX: 'hidden'
})

css.global('body', {
  backgroundColor: 'transparent',
  margin: 0
})

css.global('*', {
  boxSizing: 'border-box'
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
registerServiceWorker();
