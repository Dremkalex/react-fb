//Core
import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinning from 'components/Spinner';

//Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {
    static propTypes = {
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    }

    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._removePost = this._removePost.bind(this);
    }

    state = {
        posts: [
            {id: '123', comment: 'Hi there!', created: 1548535397, likes: [] },
            {id: '456', comment: 'Приветик!', created: 1548535831, likes: [] },
        ],
        isPostFetching: false,
    }

    _setPostsFetchingState(state) {
        this.setState({
            isPostFetching: state,
        });
    }

    async _createPost(comment) {
        this._setPostsFetchingState(true);
        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts:          [ post, ...posts ],
            isPostFetching: false,
        }));
    }

    async _likePost(id) {
        const { posts } = this.state;
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setPostsFetchingState(true);
        await delay(1200);

        const newPosts = posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:          newPosts,
            isPostFetching: false,
        });
    }

    async _removePost(id) {
        const {posts} = this.state;

        this._setPostsFetchingState(true);
        await delay(1200);

        const newPosts = posts.filter((post) => post.id !== id);

        this.setState({
            posts:          newPosts,
            isPostFetching: false,
        });
    }

    render() {
        const {posts, isPostFetching } = this.state;
        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _likePost = { this._likePost }
                    _removePost = { this._removePost }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                {<Spinning isSpinning = { isPostFetching }/>}
                <StatusBar />
                <Composer _createPost = { this._createPost }/>
                {postsJSX}
            </section>
        );
    }
}
