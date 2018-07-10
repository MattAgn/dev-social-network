const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const router = express.Router();

// Load models
const Profile = require('../../models/profile');
const User = require('../../models/user');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


// Callbacks
const getUserProfile = (req, res) => {
  const errors = {};

  Profile
    .findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
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
  console.log('body', req.body)
  const { errors, isValid } = validateProfileInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.education) profileFields.education = req.body.education;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.experience) profileFields.experience = req.body.experience;
  if (req.body.github_username) profileFields.github_username = req.body.github_username;

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
        Profile
          .findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields},
            { new: true}
          )
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err))
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
          .catch(err => console.log(err))

        //Save
        new Profile(profileFields)
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err))
      }
    })
}

const getProfileByHandle = (req, res) => {
  const errors = {};
  Profile
    .findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
}

const getProfileById = (req, res) => {
  const errors = {};
  Profile
    .findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json({noProfile: 'There is no profile for this user'}))
}

const getAllProfiles = (req, res) => {
  const errors = {};

  Profile
    .find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = 'There are no profiles'
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err => res.status(404).json({noProfile: 'There are no profiles'}))
}

const addNewExperience = (req, res) => {
  const { errors, isValid} = validateExperienceInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }
      profile.experience.unshift(newExp);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => console.log(err))
    })
}



// @route   GET test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'profile works'}))

// @route   GET api/profile
// @desc    get user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), getUserProfile)

// @route   GET api/profile/handle/:handle
// @desc    get user profile by handle
// @access  Public
router.get('/handle/:handle', getProfileByHandle)

// @route   GET api/profile/user/:user_id
// @desc    get user profile by user id
// @access  Public
router.get('/user/:user_id', getProfileById)

// @route   GET api/profile/all
// @desc    get all profiles
// @access  Public
router.get('/all', getAllProfiles)

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), createEditUserProfile)

// @route   POST api/profile/experience
// @desc    Add new experience
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), addNewExperience)

module.exports = router;