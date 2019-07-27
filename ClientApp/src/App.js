import React, { Component } from 'react';
import { Route } from 'react-router';
import { Main } from './components/Main';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <React.Fragment>
        <Route path='/:server/:user' component={Main} />
        <Route exact path='/' component={Main} />
      </React.Fragment>
    );
  }
}
