import React from "react";
import { Route, Redirect } from "react-router-dom";
import ApiServices from "../services/api-services";

const PrivateRoute = (props) => {
    let service = new ApiServices();
    const condition = service.isLogin();
    return condition ? (<Route path={props.path} exact={props.exact} render={() => <props.render />} />) :
        (<Redirect to="/" />);
};
export default PrivateRoute;