import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

// perf
if (__DEV__) {
  import Perf from 'react-addons-perf'
  window.Perf = Perf
}

// init state
const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

// Render Setup
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  ReactDOM.render(<AppContainer store={store} />, MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./containers/AppContainer', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      }),
    );
  }
}

// start
render();
