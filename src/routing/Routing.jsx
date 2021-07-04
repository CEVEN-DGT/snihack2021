import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CheckIn from "../screens/Checkin";
import Home from "../screens/Home";
import ParkGraph from "../screens/ParkGraph";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import PrivateRoute from "./PrivateRoute";


class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <SignIn {...this.props} />} />

          <Route exact path="/signup" render={() => <SignUp {...this.props} />} />

          <PrivateRoute
            exact
            path="/home"
            render={() => <Home {...this.props} />}
          />
          <PrivateRoute
            exact
            path="/checkin"
            render={() => <CheckIn {...this.props} />}
          />
          <PrivateRoute
            exact
            path="/park-info"
            render={() => <ParkGraph {...this.props} />}
          />

        </Switch>
      </Router>
    );
  }
}

export default Routing;
