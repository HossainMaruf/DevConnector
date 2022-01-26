// import core modules
import React from 'react';
//import custom modules
import Share from '../share/Share';
import Post from '../post/Post';
// import css module
import classes from './feed.css';

const Feed = () => {
    return (
        <>
            <div className={classes.feed}>
                <div className={classes.feedWrapper}>
                    <Share />
                    <Post />
                </div>
            </div>
        </>
    );
}

export default Feed;
