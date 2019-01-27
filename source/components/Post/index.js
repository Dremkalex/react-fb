//Core
import React, { Component } from 'react';
import moment from 'moment';
import { string, number } from 'prop-types';

//Components
import { Consumer } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        comment: string.isRequired,
        created: number.isRequired,
    };

    render() {
        const { comment, created } = this.props;

        return (
            <Consumer>{(context) => (
                <section className = { Styles.post }>
                    <img src = { context.avatar } />
                    <a>{ `${context.currentUserFirstName} ${context.currentUserLastName}` }</a>
                    <time>{moment.unix(created)
                        .format('MMMM D h:mm:ss a')}
                    </time>
                    <p>{ comment }</p>
                </section>
            )}
            </Consumer>
        );
    }
}
