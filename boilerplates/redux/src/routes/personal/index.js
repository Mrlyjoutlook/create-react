import React from 'react';
import { Route } from 'react-router-dom';
import { injectReducer } from '../../store/reducers';
import LazilyLoad, { importLazy } from 'lazilyload';

export default function PersonalRoute({ store, ...props }) {
  return (
    <Route {...props} render={ ({ match }) => (
        <LazilyLoad modules={{
          Personal: () => importLazy(import(/* webpackChunkName: "personal" */ './components/PersonalContainer')),
        }}>
          {({ Personal }) => {
            const reducer = require('./modules/personalReduer').default;
            injectReducer(store, { key: 'personal', reducer });
            return (
              <Personal />
            )
          }}
        </LazilyLoad>
      )}
    />
  )
}