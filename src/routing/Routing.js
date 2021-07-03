import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../screens/Home";
import MainPage from "../screens/MainPage";
import PrivateRoute from "./PrivateRoute";

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Home {...this.props} />} />
          <PrivateRoute
            exact
            path="/mainpage"
            render={() => <MainPage {...this.props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default Routing;
