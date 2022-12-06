// Import express
const express = require('express');

// Initialize the app
const router = express.Router();

// Import Routes
const userController = require('../controllers/userController');

router.get('/users', userController.users);

router.get('/groupes', userController.groupes);

router.get('groupes/:id', userController.usersList);

router.get('/login', userController.login);

router.post('/register', userController.register);

module.exports = router;