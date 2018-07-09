const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const router = express.Router();

// Load models
const Profile = require('../../models/profile');
const User = require('../../models/user');

const validateProfileInput = require('../../validation/profile');

// Callbacks
const getUserProfile = (req, res) => {
  const errors = {};

  Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
}

const createEditUserProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = res.body.handle;
  if (req.body.company) profileFields.company = res.body.company;
  if (req.body.location) profileFields.location = res.body.location;
  if (req.body.education) profileFields.education = res.body.education;
  if (req.body.website) profileFields.website = res.body.website;
  if (req.body.status) profileFields.status = res.body.status;
  if (req.body.bio) profileFields.bio = res.body.bio;
  if (req.body.experience) profileFields.experience = res.body.experience;
  if (req.body.github_username) profileFields.github_username = res.body.github_username;

  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',') 
  }

  profileFields.socials = {};
  if (req.body.youtube) profileFields.socials.youtube = req.body.youtube; 
  if (req.body.facebook) profileFields.socials.facebook = req.body.facebook; 
  if (req.body.twitter) profileFields.socials.twitter = req.body.twitter; 
  if (req.body.linkedin) profileFields.socials.linkedin = req.body.linkedin; 
  if (req.body.instagram) profileFields.socials.instagram = req.body.instagram; 

  Profile
    .findOne({ user: req.user.id})
    .then(profile => {
      if (profile) {
        // Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields},
          { new: true}
        )
      } else {
        // Create profile
        // Check handle
        Profile
          .findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              error.handle = 'This handle already exists';
              return res.status(400).json(errors);
            }
          })

        //Save
        new Profile(profileFields)
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err))
      }
    })

}



// @route   GET test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'profile works'}))

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), createEditUserProfile)

module.exports = router;