import React from 'react';
import { injectReducer } from '../../store/reducers';
import LazilyLoad, { importLazy } from 'lazilyload';

export default store => match => {
  return (
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
  )
}

