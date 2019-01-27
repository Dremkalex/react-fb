//Core
import React, { Component } from 'react';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinning from 'components/Spinner';

//Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            {id: '123', comment: 'Hi there!', created: 1548535397 },
            {id: '456', comment: 'Приветик!', created: 1548535831 },
        ],
        isSpinning: true,
    }

    render() {
        const {posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                {isSpinning && <Spinning />}
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        );
    }
}
