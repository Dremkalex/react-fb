//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.m.css';

export default class Composer extends Component {
    static propTypes = {
        avatar:               PropTypes.string,
        currentUserFirstName: PropTypes.string,
    };

    render() {
        const {avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What's on your mind, ${currentUserFirstName}` } />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
