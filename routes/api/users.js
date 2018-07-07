const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const router = express.Router();

const User = require('../../models/user');

// Callbacks
function registerUser(req, res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'An account already exists for this email' });
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
  User
    .findOne({ email })
    .then((user) => {
      // Check user exists
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
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
                  token: `Bearer${token}`,
                });
              },
            );
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        });
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

module.exports = router;
