import React from 'react';
import { injectReducer } from '../../store/reducers';
import LazilyLoad, { importLazy } from 'lazilyload';

export default store => match =>
  <LazilyLoad modules={{
    Login: () => importLazy(import(/* webpackChunkName: "login" */ './components/LoginContainer')),
  }}>
    {({ Login }) => {
      const reducer = require('./modules/loginReduer').default;
      injectReducer(store, { key: 'login', reducer });
      return (
        <Login />
      )
    }}
  </LazilyLoad>

