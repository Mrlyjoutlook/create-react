import React, { Component } from 'react';
import { object } from 'prop-types';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../../components/Header';
import { loginRoute, personalRoute } from '../../config/routesConfig'
import LoginRoute from '../../routes/login';
import PersonalRoute from '../../routes/personal';
import '../../styles/index.css';

require('normalize.css');

class App extends Component {
  static propTypes = {
    // routes: PropTypes.object.isRequired,
    store: object.isRequired,
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to={loginRoute.path}>Login</Link></li>
              <li><Link to={personalRoute.path}>Personal</Link></li>
              <li><Link to="/mrlyj">Not Found</Link></li>
            </ul>
            <hr />
            <Switch>
              <Route exact path="/" component={Header} />
              <LoginRoute path={loginRoute.path} store={store} />
              <PersonalRoute path={personalRoute.path} store={store} />
              <Route render={({ match }) => { return <h1>Not Found</h1> }} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
