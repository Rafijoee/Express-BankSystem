const express = require('express');
const router = express.Router();
const passport = require('../lib/passport');
const AuthController = require('../controllers/auth.Controller');

router.get('/register', AuthController.register);
router.get('/login', AuthController.login);
router.post('/register', AuthController.registerPost);

// Ubah ke passport.authenticate di sini
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/dashboard', (req, res) => {
    res.render('dashboard'); // ini akan mencoba merender file views/dashboard.ejs
});

module.exports = router;
