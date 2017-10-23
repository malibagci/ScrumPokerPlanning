import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import store, {history} from './store'
import Firebase from './utils/firebase';

Firebase.initialize();
// Containers
import Main from './containers/Main.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' component={Main}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;