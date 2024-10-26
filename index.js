require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const router = require('./routes/auth.routes'); // pastikan router sudah diimport atau sesuaikan dengan path router Anda

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

app.use(morgan('dev'));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  });

const authRouter = require('./routes/auth.routes');
app .use('/', authRouter);


app.listen(port, () => {
    console.log(`I LOVE YOU ${port} ===> biar sama kayak mas febrian wkwkwk`);
});
