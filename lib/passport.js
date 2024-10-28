const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: id } });
        done(null, user); // user disimpan dalam `req.user`
    } catch (error) {
        done(error, null);
    }
});


const authenticate = async (email, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return done(null, false, { message: 'Email or password is wrong' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return done(null, false, { message: 'Email or password is wrong' });
        }

        return done(null, user);
    } catch (error) {
        return done(error, "ini adalah errornya");
    }
}

passport.use( new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, authenticate));


module.exports = passport;