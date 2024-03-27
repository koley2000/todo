const express = require('express')
const router = express.Router();
const Posts = require('../models/Posts');
const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');

//Router 1: Fetch all posts 
router.get('/fetchallposts', fetchuser, async (req, res) => {
    try {
        const posts = await Posts.find({ user: req.user.id });
        res.json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Router 2: Add Post
router.post('/addpost', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const post = new Posts({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedpost = await post.save();
        res.json(savedpost);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Router 3: Update Post
router.put('/updatepost/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        let src = Posts.findById(req.params.id)
        if (!src) { 
            return res.status(404).send("Not Found") 
        }
        if (src.user?.toString()  !== req.user._id) { 
            return res.status(401).send("Not Allowed") 
        }

        //create newpost object
        const newpost = {}
        if (title) { newpost.title = title }
        if (description) { newpost.description = description }
        if (tag) { newpost.tag = tag }

        let post = await Posts.findByIdAndUpdate(req.params.id, { $set: newpost }, { new: true })
        res.json({ post })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Router 4: Delete Post
router.delete('/deletepost/:id', fetchuser, async (req, res) => {
    try {
        //Find the post to be deleted
        let src = Posts.findById(req.params.id)
        if (!src) { 
            return res.status(404).send("Not Found") 
        }
        if (src.user?.toString() !== req.user._id) { 
            return res.status(401).send("Not Allowed") 
        }

        let post = await Posts.findByIdAndDelete(req.params.id)
        res.json(post)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;