import React, { Component } from 'react';
import { object } from 'prop-types';
import BaseInfo from '../BaseInfo';
import { lazilyLoadComponent } from 'lazilyload';

class PersonalContainer extends Component {
  static propTypes = {
  }

  state = {
      visible: false,
  }

  handleOnClick = () => {
      this.setState({
            visible: true
      })
  }

  asyncComponent = () => {
    const OtherInfo = lazilyLoadComponent(() => import( /* webpackChunkName: "OtherInfo" */ '../OtherInfo'))
    return <OtherInfo/>
  }

  render () {
    const { visible, Comp } = this.state;

    return (
      <div>
        <h2>eg: Click add component</h2>
        <div style={{ width:200, height:20, background: '#000', color: '#fff', textAlign: 'center'}} onClick={this.handleOnClick}>click baseInfo component</div>
        {visible && <BaseInfo/>}
        {visible && this.asyncComponent()}
      </div>
    );
  }
}

export default PersonalContainer;