import React, { Component } from 'react';
import { object } from 'prop-types';

class LoginContainer extends Component {
  static propTypes = {
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div>
        login...
      </div>
    );
  }
}

export default LoginContainer;


