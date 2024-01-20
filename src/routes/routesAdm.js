import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Login } from '../pages/Login';
import { AddUserLogin } from '../pages/AddUserLogin';

import { Dashboard } from '../pages/Dashboard';
import { Users } from '../pages/Users';
import { AddUser } from '../pages/AddUser';
import { ViewUser } from '../pages/ViewUser';
import { EditUser } from '../pages/EditUser';

import { ViewRoute } from '../pages/ViewRoute';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated } = useContext(Context);

    if (isPrivate && !authenticated) {
        return <Redirect to="/" />
    }
    return <Route { ...rest} />
}

export default function RoutesAdm() {
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute exact path="/add-user-login" component={AddUserLogin} />
           

            <CustomRoute exact isPrivate path="/dashboard" component={Dashboard} />
            <CustomRoute exact isPrivate path="/users" component={Users} />
            <CustomRoute exact isPrivate path="/add-user" component={AddUser} />
            <CustomRoute exact isPrivate path="/view-client/:id" component={ViewUser} />
            <CustomRoute exact isPrivate path="/edit-client/:id" component={EditUser} />
            <CustomRoute exact isPrivate path="/view-route" component={ViewRoute} />
        </Switch>
    );
};