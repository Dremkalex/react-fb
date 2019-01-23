//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        avatar:               PropTypes.string,
        currentUserFirstName: PropTypes.string,
        currentUserLastName:  PropTypes.string,
    };

    render() {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>{ `${currentUserFirstName} ${currentUserLastName}` }</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
