require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const routerAuth = require('./routes/auth.routes'); // pastikan router sudah diimport atau sesuaikan dengan path router Anda
const routerAccount = require('./routes/account.routes'); // pastikan router sudah diimport atau sesuaikan dengan path router Anda
const passport = require('./lib/passport'); // pastikan passport sudah diimport atau sesuaikan dengan path passport Anda

const app = express();
const port = process.env.PORT || 3000; // Menggunakan port dari .env jika ada

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret', // Gunakan .env untuk menyimpan nilai rahasia
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  });

app .use('/api/v1', routerAuth);
app.use('/api/v1', routerAccount);


app.listen(port, () => {
    console.log(`I LOVE YOU ${port} ===> biar sama kayak mas febrian wkwkwk`);
});
