// initialize route
const router = require("express").Router();
// custom modules (Schema)
const Post = require("../models/Post.js");
const User = require("../models/User.js");

// create a new post
router.post('/newpost', async (req, res, next) => {
    const newPost = new Post(req.body);
    try {
        const createdPost = await newPost.save();
        res.status(200).json(createdPost);
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;