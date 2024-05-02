var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const users = await User.findAll();
  res.render('index', { users });
});

router.post('/', async function(req, res, next) {
  const user = await User.findUser(req.body.email);
  if (user !== null) {
    console.log("user already exists");
  } else {
    User.addUser(req.body.firstname, req.body.lastname, req.body.email);
  }
  const users = await User.findAll();
  res.render('index', { users });
});

module.exports = router;
