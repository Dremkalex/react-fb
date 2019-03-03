//Core
import React, { Component } from 'react';
import { func } from 'prop-types';

//Instruments
import Styles from './styles.m.css';

export default class Login extends Component {
    static propTypes = {
        _handleLogIn: func.isRequired,
    }

    render() {
        const { _handleLogIn } = this.props;

        return (
            <section className = { Styles.login }>
                <header>facebook</header>
                <form onSubmit = { _handleLogIn }>
                    <h1>Log Into Facebook</h1>
                    <input placeholder = 'Email or Phone'/>
                    <input placeholder = 'Password'/>
                    <button type = 'submit'>Log in</button>
                </form>
            </section>
        );
    }
}
