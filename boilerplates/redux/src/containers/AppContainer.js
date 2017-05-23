import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import LazilyLoad, { importLazy } from '../utils/lazilyload';

class AppContainer extends Component {
  static propTypes = {
    // routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false;
  }

  load = () => {
    return (
      <LazilyLoad modules={{
        Header: () => importLazy(import('../components/Header')),
      }}>
        {({ Header }) => (
          <Header />
        )}
      </LazilyLoad>
    );
  }

  render () {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/topics">Topics</Link></li>
            </ul>
            <hr />
            <Switch>
              <Route exact path="/" render={() => { console.log('home1'); return (<h1>Home1</h1>); }} />
              <Route path="/about" render={this.load} />
              { /*<Route path="/:id" render={() => { console.log('home3'); return (<h1>Home3</h1>); }} /> */}
              <Route render={() => { console.log('Not Found'); return (<h1>Not Found</h1>); }} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default AppContainer;
