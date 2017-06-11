import React, { Component } from 'react';
import { object } from 'prop-types';
import BaseInfo from '../BaseInfo';

class PersonalContainer extends Component {
  static propTypes = {
  }

  state = {
      visible: false
  }

  handleOnClick = () => {
      this.setState({
          visible: true
      })
  }

  render () {
    const { visible } = this.state;

    return (
      <div>
        <h1>下面为点击加载组件</h1>
        <div onClick={this.handleOnClick}>点击加载baseInfo</div>
        { visible && <BaseInfo/> }
      </div>
    );
  }
}

export default PersonalContainer;