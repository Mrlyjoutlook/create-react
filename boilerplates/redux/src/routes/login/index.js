import React from 'react';
import { injectReducer } from '../../store/reducers';
import LazilyLoad, { importLazy } from 'lazilyload';

export default store => match => {
  return (
    <LazilyLoad modules={{
      Login: () => importLazy(import(/* webpackChunkName: "book-list-modals-X" */ './components/LoginContainer')),
    }}>
      {({ Login }) => {
        const reducer = require('./modules/loginReduer').default;
        injectReducer(store, { key: 'login', reducer });
        return (
          <Login />
        )
      }}
    </LazilyLoad>
  )
}

