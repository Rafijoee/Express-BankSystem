const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');


router.get('/register', AuthController.register);
router.get('/login', AuthController.login);
router.post('/register', AuthController.registerPost);
router.post('/login', AuthController.loginPost);
router.get('/auth/authenticate', AuthController.authenticate);

module.exports = router;