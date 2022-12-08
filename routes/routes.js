// Import express
const express = require('express');

// Initialize the app
const router = express.Router();
const { middlewareConnexion } = require('../middleware/middlewareConnexion');

// Import Routes
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);

router.get('/groupes', userController.getGroup);

router.get('/usersList', userController.getUsersList);

router.get('/login', userController.login);

router.post('/register', middlewareConnexion(), userController.register);

module.exports = router;