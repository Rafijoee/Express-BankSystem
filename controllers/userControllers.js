const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

class userControllers {
    static async getUsers(req, res) {
        try {
            // Mengambil data pengguna dari database
            const users = await prisma.user.findMany({
                include: {
                    profile: true,
                },
            });
            if (users.length === 0) {
                return res.status(404).json({ 
                    message: "Data akun tidak ditemukan" 
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Failed to retrieve users",
                error: error.message
            });
        }
    }
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) },
                include: {
                    profile: true,
                },
            });
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            }
            return res.status(200).json({
                status: "success",
                message: "User retrieved successfully",
                data: user
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Failed to retrieve user",
                error: error.message
            });
        }
    }
    // static async createUser(req, res) {
    //     const { email, name, identity_type, identity_number, address } = req.body;
    //     try {
    //         const user = await prisma.user.create({
    //             data: {
    //                 email: email,
    //                 name: name,
    //                 password: "password",
    //                 profile: {
    //                     create: {
    //                         identify_type: identity_type,
    //                         identify_number: identity_number,
    //                         address: address,
    //                     }
    //                 }
    //             },
    //             include: {
    //                 profile: true,
    //             }
    //         });
    //         res.status(201).json({
    //             status: "success",
    //             message: "User created successfully",
    //             data: user
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({
    //             status: "error",
    //             message: "Failed to create user",
    //             error: error.message
    //             });
    //     }
    // }
}

module.exports = userControllers;