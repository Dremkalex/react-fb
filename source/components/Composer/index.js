//Core
import React, { Component } from 'react';
import { func } from 'prop-types';

//Components
import { Consumer } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

export default class Composer extends Component {
    static propTypes = {
        _createPost: func.isRequired,
    };

    constructor() {
        super();
        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
    }

    state = {
        comment: '',
    };

    _updateComment ({target: { value }}) {
        this.setState({
            comment: value,
        });
    }

    _submitComment() {
        const { comment } = this.state;
        const { _createPost } = this.props;

        if (!comment) {
            return null;
        }

        _createPost(comment);

        this.setState({
            comment: '',
        });
    }

    _handleFormSubmit(event) {
        event.preventDefault();
        this._submitComment();
    }

    _submitOnEnter(event) {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._submitComment();
        }
    }

    render() {
        const { comment } = this.state;

        return (
            <Consumer>{({avatar, currentUserFirstName }) => (
                <section className = { Styles.composer }>
                    <img src = { avatar } />
                    <form onSubmit = { this._handleFormSubmit }>
                        <textarea
                            placeholder = { `What's on your mind, ${currentUserFirstName}` }
                            value = { comment }
                            onChange = { this._updateComment }
                            onKeyPress = { this._submitOnEnter }
                        />
                        <input
                            type = 'submit'
                            value = 'Post'
                        />
                    </form>
                </section>
            )}
            </Consumer>
        );
    }
}
