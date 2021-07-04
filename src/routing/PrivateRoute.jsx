import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppServices from "../services/AppService";

const PrivateRoute = (props) => {
    let service = new AppServices();
    const condition = service.isLogin();
    return condition ? (<Route path={props.path} exact={props.exact} render={() => <props.render />} />) :
        (<Redirect to="/" />);
};
export default PrivateRoute;