const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

const router = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const User = require('../../models/user');

// Callbacks
function registerUser(req, res) {
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = 'An account already exists for this email';
        return res.status(400).json(errors);
      }
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm', // Default
      });
      const newUser = new User({
        name: req.body.name,
        password: req.body.name,
        avatar,
        email: req.body.email,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (errBis, hash) => {
          if (errBis) throw errBis;
          newUser.password = hash;
          newUser
            .save()
            .then(resTer => resTer.json(user))
            .catch(error => console.log(error));
        });
      });
    });
}

function loginUser(req, res) {
  const { email, password } = req.body;
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User
    .findOne({ email })
    .then((user) => {
      // Check user exists
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      // Check password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // Create JWT payload
            const payload = {
              avatar: user.avatar,
              name: user.name,
              id: user.id,
            };

            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 36000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              },
            );
          } else {
            errors.password = 'Incorrect passord';
            return res.status(400).json(errors);
          }
        });
    });
}

function authenticateUser(req, res) {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
}


// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

// @route   GET api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   GET api/users/login
// @desc    User login
// @access  Public
router.post('/login', loginUser);

// @route   GET api/users/current
// @desc    Current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), authenticateUser);

module.exports = router;
