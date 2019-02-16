// Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';


class Postman extends Component {
    state = {
        isEnter: true,
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            isEnter: false,
        }), 4000);
    }

    _handleEnter = (postman) => fromTo(postman, 1, { x: 1000 }, { x: -50 })
    _handleExit = (postman) => fromTo(postman, 1, { x: -50 }, { x: 1000 })


    render() {
        const { avatar, currentUserFirstName } = this.props;
        const { isEnter } = this.state;

        return (
            <Transition
                appear
                unmountOnExit
                in = { isEnter }
                timeout = { 1000 }
                onEnter = { this._handleEnter }
                onExit = { this._handleExit }>
                <section className = { Styles.postman }>
                    <img src = { avatar }/>
                    <span>Welcome, online, { currentUserFirstName }</span>
                </section>
            </Transition>
        );
    }
}
export default withProfile(Postman);
