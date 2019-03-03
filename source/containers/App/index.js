// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Feed from 'components/Feed';
import StatusBar from 'components/StatusBar';
import Profile from 'components/Profile';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from 'theme/assets/lisa';

const options = {
    avatar,
    currentUserFirstName: 'Александра',
    currentUserLastName:  'Мащенко',
};

@hot(module)
export default class App extends Component {
    state = {
        isAuthenticated: false,
    }

    componentDidMount() {
        this._checkAuthentificate();
    }

    _checkAuthentificate= () => this.setState({
        isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')),
    })

    _handleLogIn = () => this.setState({
        isAuthenticated: true,
    }, () => localStorage.setItem('isAuthenticated', 'true'))

    _handleLogOut = () => this.setState({
        isAuthenticated: false,
    }, () => localStorage.setItem('isAuthenticated', 'false'))

    render() {
        const { isAuthenticated } = this.state;

        const privatePageJSX = (
            <Provider value = { options }>
                <StatusBar _handleLogOut = { this._handleLogOut } />
                <Switch>
                    <Route
                        component = { Feed }
                        path = '/feed'
                    />
                    <Route
                        component = { Profile }
                        path = '/profile'
                    />
                    <Redirect to = '/feed' />
                </Switch>
            </Provider>
        );

        const publicPageJSX = (
            <Switch>
                <Route
                    path = '/login'
                    render = { () => <Login _handleLogIn = { this._handleLogIn } /> }
                />
                <Redirect to = '/login' />
            </Switch>
        );

        return isAuthenticated ? privatePageJSX : publicPageJSX;
    }
}
