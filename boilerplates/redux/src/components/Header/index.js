import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

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
      <div>hello world!!</div>
    );
  }
}

export default Header;
