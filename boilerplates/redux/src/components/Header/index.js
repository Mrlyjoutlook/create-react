import React, { Component } from 'react';
import { object } from 'prop-types';

class Header extends Component {
  static propTypes = {
    // routes: PropTypes.object.isRequired,
    // store: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div>
        <h1>Creat React App</h1>
        <div dangerouslySetInnerHTML={{__html: 'react-router 4.x,<br/> webpack 2.x,<br/>'}} />
        <hr />
      </div>
    );
  }
}

export default Header;
