const express = require('express');
const router = express.Router();
const passport = require('../lib/passport');
const AuthController = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');
const restrict = require('../middleware/restrict');
const AccountControllers = require('../controllers/accountControllers');

router.post('/api/v1/login', AuthController.handleLogin);
router.post('/api/v1/register', AuthController.registerPost)
router.get('/api/v1/users', userControllers.getUsers);
router.get('/api/v1/users/:id', userControllers.getUserById);
router.post('/api/v1/jwttoken', restrict, (req, res) => {
    res.redirect('auth/authenticate')
});
router.get('/auth/authenticate', (req, res) => {
    res.send('Authenticated');
});
router.get('/api/v1/accounts', AccountControllers.getAccounts);
router.post('/api/v1/accounts', AccountControllers.createAccount);
router.get('/api/v1/accounts/:id', AccountControllers.getAccountById);
module.exports = router;
