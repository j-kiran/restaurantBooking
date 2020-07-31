/** @format */

const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../model/User');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    // username must be an email
    check('email', 'please include a valid email').isEmail(),
    // password must be at least 5 chars long
    check(
      'password',
      'please enter a password with 6 or more character'
    ).isLength({min: 6}),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
      //see if user exists

      let user = await User.findOne({email: email});

      if (user) {
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
      }



      user = new User({
        name,
        email,
        password
      });

      //encrypt password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //return jsonwebtoken

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;