import React, { Component } from 'react';
import { object } from 'prop-types';
import BaseInfo from '../BaseInfo';

class PersonalContainer extends Component {
  static propTypes = {
  }

  state = {
      visible: false,
      Comp: ()=>{}
  }

  handleOnClick = () => {
      // import( /* webpackChunkName: "baseInfo" */ '../BaseInfoItem').then(
      //   Comp => {
      //     this.setState({
      //       visible: true,
      //       Comp: Comp.default
      //     },()=>{console.log('aa')})
      //   }
      // )
      this.setState({
            visible: true
      })
  }

  render () {
    const { visible, Comp } = this.state;

    return (
      <div>
        <h2>eg: Click add component</h2>
        <div style={{ width:200, height:20, background: '#000', color: '#fff', textAlign: 'center'}} onClick={this.handleOnClick}>click baseInfo component</div>
        { visible && <BaseInfo/> }
      </div>
    );
  }
}

export default PersonalContainer;