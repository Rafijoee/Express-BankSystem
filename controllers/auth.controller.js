const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AuthController {
    static async register(req, res) {
        res.render('register');
    }

    static async login(req, res) {
        res.render('loginPage');
    }

    static async registerPost(req, res) {
        try {
            const { name, email, password } = req.body;
            const emailExist = await prisma.user.findUnique({
                where: { email: email }
            });

            if (emailExist) {
                req.flash('error', 'Email already exists');
                return res.redirect('/register');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword
                }
            });

            req.flash('success', 'Register success, please login');
            return res.redirect('/login');
        } catch (error) {
            console.error(error);
            req.flash('error', 'Something went wrong, please try again.');
            return res.redirect('/register');
        }
    }

    static async authenticate(req, res) {
        res.render('authenticate', { user: req.session.user });
    }
}

module.exports = AuthController;
