const express = require('express');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();

const usersController = require("../controllers/users-controller");

// api/users
router.get('/', usersController.getAllUsers);

// api/user/signup
router.post('/signup', fileUpload.single('image'),usersController.signup);

// api/user/login
router.post('/login', usersController.login);



module.exports = router;