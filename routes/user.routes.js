const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register',
  body("username").trim().isLength({ min: 5 }),
  body("password").trim().isLength({ min: 3 }),
  body("email").trim().isLength({ min: 10 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data"
      })
    }
    res.send(errors);
  })

module.exports = router;
