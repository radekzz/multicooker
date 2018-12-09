import React, { Component } from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import App from './App';
import Recipes from './Pages/Recipes';
import NotFound from './Components/NotFound';

export default class Router extends Component {
  render() {
    return (
      <HashRouter>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={App} />
            <Route
              path="/recipes"
              render={props => <Recipes {...props} />}
            />
            <Route render={() => <NotFound />} />
          </Switch>
        </React.Fragment>
      </HashRouter>
    );
  }
}