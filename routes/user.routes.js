const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

const userModel = require('../models/user.model')
const bcryptjs = require('bcryptjs');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register',
  body("username").trim().isLength({ min: 5 }),
  body("password").trim().isLength({ min: 3 }),
  body("email").trim().isLength({ min: 10 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data"
      })
    }

    const { username, email, password } = req.body;
    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await userModel.create({
      email,
      username,
      password: hashPassword

    })

    res.json(newUser)
  })

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  async (req, res) => {
    body('username').trim().isLength({ min: 3 }),
      body('password').trim().isLength({ min: 5 })

    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data"
      })
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({
      username: username
    })

    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect"
      })
    }

    const isMatch = await bcryptjs.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: "username or password is incorrect"
      })
    }

    const token = jwt.sign({
      userId: user._id,
      email: user.email,
      password: user.password,
    },
      process.env.JWT_SECRET)

    res.cookie('token', token)

    res.send('Logged in')

  }


)

module.exports = router;
