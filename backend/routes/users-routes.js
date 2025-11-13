const express = require('express');
const router = express.Router();

const usersController = require("../controllers/users-controller");

// api/users
router.get('/', usersController.getAllUsers);

// api/user/signup
router.post('/signup', usersController.signup);

// api/user/login
router.post('/login', usersController.login);



module.exports = router;