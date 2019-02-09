//Core
import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';

//Components
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinning from 'components/Spinner';

//Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

@withProfile
export default class Feed extends Component {
    static propTypes = {
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    }

    state = {
        posts: [
            {id: '123', comment: 'Hi there!', created: 1548535397, likes: [] },
            {id: '456', comment: 'Приветик!', created: 1548535831, likes: [] },
        ],
        isPostFetching: false,
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    }

    _createPost = async (comment) => {
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

    _likePost = async (id) => {
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

    _removePost = async (id) => {
        this._setPostsFetchingState(true);
        await delay(1200);

        this.setState(({posts}) => ({
            posts:          posts.filter((post) => post.id !== id),
            isPostFetching: false,
        }));
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
