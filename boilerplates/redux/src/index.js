import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import rootSaga from './saga';
import App from './containers/App';

// perf
if (__DEV__) {
  window.Perf = require('react-addons-perf')
}

// init state
const initialState = window.__INITIAL_STATE__;
const { store, runSaga } = createStore(initialState);

// run saga
runSaga(rootSaga);

// Render Setup
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  ReactDOM.render(<App store={store} />, MOUNT_NODE);
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
    module.hot.accept('./containers/App', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      }),
    );
  }
}

// start
render();
