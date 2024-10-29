const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let jwt = require('jsonwebtoken');
let JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
    static async handleLogin(req, res) {
        try{
            let { email, password } = req.body;
            // console.log(email, password, "ini email dan password");
            const user = await prisma.user.findUnique({
                where: { email: email }
            });
            if (!user){
                res.status(404).json({
                    message: "not found",
                    error : "invalid email or password"
                });
            } else {
                let isPasswordMatch = await bcrypt.compare(password, user.password);
                if (!isPasswordMatch){
                    res.status(400).json({
                        message: "Bad request",
                        error: "invalid email or password"
                    });
                } else {
                    const accesToken = jwt.sign ({
                        id: user.id,
                        email: user.email
                    }, JWT_SECRET);

                    res.status(200).json({
                        message: "success",
                        data: {
                            id: user.id,
                            email: user.email,
                            accesToken
                        }
                    });
                }
            }

        } catch (error) {

        }

    }


    static async registerPost(req, res) {
        try {
            const { name, email, password } = req.body;
            const emailExist = await prisma.user.findUnique({
                where: { email: email }
            });

            if (emailExist) {
                res.status(400).json({
                    message: "Bad request",
                    error: "Invalid input"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const data = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword
                }
            });
            res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: data
            });


        } catch (error) {
            console.error(error);
            req.flash('error', 'Something went wrong, please try again.');
        }
    }
}

module.exports = AuthController;
