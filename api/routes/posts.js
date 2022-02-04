// initialize route
const router = require("express").Router();
const passport = require('passport');
const mongoose = require('mongoose');
// custom modules (Schema)
const Post = require("../models/Post.js");
const User = require("../models/User.js");
const Profile = require("../models/Profile.js");
// validation
const validatePostInput = require('../validation/post');
/**
 * @route GET /api/posts/:id
 * @desc get a single post
 * @access public
 */
router.get('/:id', (req, res) => {
    const errors = {};
    Post.findById(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(error => {
            errors.nopost = 'There is no post';
            return res.status(404).json(errors);
        })
})

/**
 * @route GET /api/posts
 * @desc get all posts
 * @access public
 */
router.get('/', (req, res) => {
    const errors = {};
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => {
            return res.status(200).json(posts);
        })
        .catch(error => {
            errors.nopost = 'No posts found';
            return res.status(404).json(errors);
        })
})

/**
 * @route POST /api/posts
 * @desc creating a post
 * @access private
 */
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    // save the post
    newPost.save().then(post => res.json(post)).catch(error => res.json(error));
});
/**
 * @route DELETE /api/posts/:id
 * @desc delete a post
 * @access private
 */
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
           Post.findById(req.params.id) 
            .then(post => {
               if(post.user.toString() !== req.user.id) {
                return res.status(400).json({notauthorized: 'You are not authorized'});
               } else {
                post.remove().then(post => {
                    // delete the post
                    return res.status(200).json({success: true});
                }).catch(error => {
                    return res.status(404).json({postnotfound: 'Post Not Found'});
                });
               }
            })
            .catch(error => {
                return res.status(404).json({postnotfound: 'Can not find the post'});
            })
        })
        .catch(error => {
            return res.status(404).json({error: 'Can not find the user'});
        })
});

/**
 * @route POST /api/posts/like/:id
 * @desc like post
 * @access private
 */
router.post('/like/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
           Post.findById(req.params.id) 
            .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return res.status(400).json({alreadyliked: 'User already like this post'});
                }
                // add the like
               post.likes.unshift({user: req.user.id});
               post.save().then(post => {
                return res.status(200).json({success: true});
               }).catch(error => {
                return res.status(400).json({notsaved: 'Post not saved'});
               });
            })
            .catch(error => {
                return res.status(404).json({postnotfound: 'Can not find the post'});
            })
        })
        .catch(error => {
            return res.status(404).json({error: 'Can not find the user'});
        })
});
/**
 * @route POST /api/posts/unlike/:id
 * @desc unlike post
 * @access private
 */
router.post('/unlike/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
           Post.findById(req.params.id) 
            .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                    return res.status(400).json({alreadyliked: 'You have not like this post'});
                }
                // get the index
                const removeIndex = post.likes.map(item => item.user.toString());
                // splice the like
                post.likes.splice(removeIndex, 1);
               post.save().then(post => {
                return res.status(200).json({success: true});
               }).catch(error => {
                return res.status(400).json({notsaved: 'Post not saved'});
               });
            })
            .catch(error => {
                return res.status(404).json({postnotfound: 'Can not find the post'});
            })
        })
        .catch(error => {
            return res.status(404).json({error: 'Can not find the user'});
        })
});
/**
 * @route POST /api/posts/comment/:id
 * @desc Comment a post
 * @access private
 */
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
           Post.findById(req.params.id) 
            .then(post => {
                const newComment = {
                   text: req.body.text,
                   name: req.body.name,
                   avatar: req.body.avatar,
                   user: req.user.id 
                }
                 // add a comment
                 post.comments.unshift(newComment);
                 // save the comment
                 post.save().then(savedPost => {
                    return res.status(200).json(savedPost);
                 }).catch(error => {
                    return res.status(400).json({notsaved: 'Comment not added'});
                 });
            })
            .catch(error => {
                return res.status(404).json({postnotfound: 'Can not find the post'});
            })
        })
        .catch(error => {
            return res.status(404).json({error: 'Can not find the user'});
        })
});
/**
 * @route DELETE /api/posts/comment/:id/:comment_id
 * @desc Comment a post
 * @access private
 */
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
           Post.findById(req.params.id) 
            .then(post => {
                if(post.comments.filter(item => item._id.toString() === req.params.comment_id).length === 0) {
                    // comment does not exist
                    return res.status(404).json({commentnotfound: 'Comment does not exist'});
                }
                // comment exist
               // get the exact comment index 
               const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
               // splice the comment
               post.comments.splice(removeIndex, 1);
               // save the update post
               post.save().then(savedPost => {
                return res.status(200).json({success: true});
               }).catch(error => {
                return res.status(400).json({notsaved: 'Comment not deleted'});
               });
            })
            .catch(error => {
                return res.status(404).json({postnotfound: 'Can not find the post'});
            })
        })
        .catch(error => {
            return res.status(404).json({error: 'Can not find the user'});
        })
});
module.exports = router;