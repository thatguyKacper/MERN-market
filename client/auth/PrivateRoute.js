import React, { Component } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Outlet
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
export default PrivateRoute;
