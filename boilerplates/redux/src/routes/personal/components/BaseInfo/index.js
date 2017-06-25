import React, { Component } from 'react';
import { LazilyLoadFactory } from 'lazilyload';

class BaseInfo extends Component {
  render() {
    const {BaseInfoItem} = this.props.baseInfoItem;
    return (
      <div>
        <h2>该组件加载其依赖</h2>
        <BaseInfoItem/>
      </div>
    )
  }
}

export default LazilyLoadFactory(BaseInfo, {
  baseInfoItem: () => import( /* webpackChunkName: "baseInfo" */ '../BaseInfoItem'),
});
