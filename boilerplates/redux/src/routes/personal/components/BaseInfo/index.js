import React, { Component } from 'react';
import { LazilyLoadFactory, importLazy } from 'lazilyload';

class BaseInfo extends Component {
  render() {
    const {BaseInfoItem} = this.props;
    return (
      <div>
        <h2>Component add ok!</h2>
        <BaseInfoItem/>
      </div>
    )
  }
}

export default LazilyLoadFactory(BaseInfo, {
  BaseInfoItem: () => importLazy(import( /* webpackChunkName: "baseInfo" */ '../BaseInfoItem'))
});

