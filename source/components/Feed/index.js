//Core
import React, { Component } from 'react';
import { string } from 'prop-types';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

//Components
import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinning from 'components/Spinner';
import Postman from 'components/Postman';

//Instruments
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init.js';

@withProfile
export default class Feed extends Component {
    static propTypes = {
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    }

    state = {
        posts:          [],
        isPostFetching: false,
        isPostmanEnter: true,
    }

    componentDidMount () {
        setTimeout(() => this.setState({
            isPostmanEnter: false,
        }), 4000);

        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta} = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({posts}) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta} = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({posts}) => ({
                    posts: posts.filter(({id}) => id !== removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta} = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({posts}) => ({
                    posts: posts.filter(({id}) => id !== likedPost.id),
                }));
            }
        });
    }

    componentWillUnmount () {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostFetching: false,
        });
    }

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({comment}),
        });

        const { data: post } = await response.json();

        this.setState(({posts}) => ({
            posts:          [ post, ...posts ],
            isPostFetching: false,
        }));
    }

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({posts}) => ({
            posts:          posts.map((post) => post.id === likedPost.id ? likedPost : post),
            isPostFetching: false,
        }));
    }

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({posts}) => ({
            posts:          posts.filter((post) => post.id !== id),
            isPostFetching: false,
        }));
    }

    _animateComposerEnter = (composer) => {
        fromTo(composer, 2, { opacity: 0, rotationX: 50 }, { opacity: 1, rotationX: 0 });
    }

    _animatePostmanEnter = (postman) => fromTo(postman, 1, { x: 1000 }, { x: -50 })

    _animatePostmanExit = (postman) => fromTo(postman, 1, { x: -50 }, { x: 1000 })


    render() {
        const {posts, isPostFetching, isPostmanEnter } = this.state;
        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>
            );
        });

        return (
            <section className = { Styles.feed }>
                {<Spinning isSpinning = { isPostFetching }/>}
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 2000 }
                    onEnter = { this._animateComposerEnter }>
                    <Composer _createPost = { this._createPost }/>
                </Transition>
                <Transition
                    appear
                    unmountOnExit
                    in = { isPostmanEnter }
                    timeout = { 1000 }
                    onEnter = { this._animatePostmanEnter }
                    onExit = { this._animatePostmanExit }>
                    <Postman />
                </Transition>
                {postsJSX}
            </section>
        );
    }
}
