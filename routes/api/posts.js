const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

const validatePostInput = require("../../validation/post");

// Load models
const Post = require("../../models/posts");
const Profile = require("../../models/profile");

// Callbacks
const createPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
};

const getAllPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostsFound: "No posts found" }));
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostFound: "No post found with that id" })
    );
};

const deletePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: "User not authorized" });
        }

        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
  });
};

const likePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyLike: "You already liked this post" });
        }
        post.likes.push({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
  });
};

const unlikePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notLiked: "You have not yet this post" });
        }
        const updatedLikes = post.likes.filter(
          like => like.user.toString() !== req.user.id
        );
        post.likes = updatedLikes;
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
  });
};

const commentPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
};

const uncommentPost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.comments.filter(comment => comment.id === req.params.comment_id)
          .length === 0
      ) {
        return res
          .status(404)
          .json({ commentNotExisting: "This comment does not exists" });
      }
      const updatedComments = post.comments.filter(
        comment => comment.id.toString() !== req.params.comment_id
      );
      post.comments = updatedComments;
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
};

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

// @route   POST api/posts/
// @desc    Create post
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), createPost);

// @route   GET api/posts/all
// @desc    Get all posts
// @access  Public
router.get("/all", getAllPosts);

// @route   GET api/posts/:id
// @desc    Get a post by id
// @access  Public
router.get("/:id", getPost);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  likePost
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  unlikePost
);

// @route   POST api/posts/comment/:id
// @desc    Comment a post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  commentPost
);

// @route   DELETE api/posts/uncomment/:id/:comment_id
// @desc    Uncomment a post
// @access  Private
router.delete(
  "/uncomment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  uncommentPost
);

module.exports = router;
