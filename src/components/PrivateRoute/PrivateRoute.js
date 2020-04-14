import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { USER_CONST } from "../../utilities/constants";
import isEmpty from "lodash/isEmpty";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line
  const {user} = rest;
  const isLoggedIn = user && !isEmpty(user);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: payload => dispatch({ type: USER_CONST.ADD.USER, payload })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
