import React, { Component } from 'react';
import { object } from 'prop-types';

class Header extends Component {

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div>
        <h1>Creat React App</h1>
        <div dangerouslySetInnerHTML={{__html: 'react-router 4.x,<br/> webpack 3.x,<br/>'}} />
        <hr />
      </div>
    );
  }
}

export default Header;
