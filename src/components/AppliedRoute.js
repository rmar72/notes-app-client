import React from 'react';
import { Route } from 'react-router-dom';

// exporting regular function
export default ({ component: C, props: cProps, ...rest }) =>
    <Route {...rest} render= { // render, a reserved method for React Routes
        props => <C {...props} {...cProps} /> // Component with childprops, see it as <C />
    } />;
