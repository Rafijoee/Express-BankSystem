const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


class AccountControllers {
    static async getAccounts(req, res) {
        try {
            const account = await prisma.bankAccount.findMany({
            });
            if (!account) {
                return res.status(404).json({
                    status: "error",
                    message: "Bank account not found",
                });
            }
            res.status(200).json({
                status: "success",
                message: "Bank account retrieved successfully",
                data: account
            }); 
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: "Failed to retrieved bank account",
                error: error.message
            });
        }
    }
    static async getAccountById(req, res) {
        try {
            const accounts = await prisma.bankAccount.findMany();
            res.status(200).json({
                status: "success",
                message: "Accounts retrieved successfully",
                data: accounts
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: "Failed to retrieve accounts",
                error: error.message
            });
        }
    }
    static async createAccount(req, res) {
        try {
            const { userId, bankName, bankAccountNumber, balance } = req.body;
        
            const checkUser = await prisma.user.findUnique({
                where: { id: parseInt(userId) }
            });
        
            if (!checkUser) {
                return res.status(400).json({
                    status: "error",
                    message: "User not found"
                });
            }
        
            const account = await prisma.bankAccount.create({
                data: {
                    bank_name: bankName,
                    bank_account_number: bankAccountNumber,
                    balance: parseFloat(balance),
                    userId: parseInt(userId)  // Gunakan 'userId' sesuai dengan definisi di schema Prisma
                }
            });
        
            res.status(201).json({
                status: "success",
                message: "Account created successfully",
                data: account
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: "Failed to create account",
                error: error.message
            });
        }
    }
    static async getAccountById(req, res) {
        try {
            const { id } = req.params;
            const account = await prisma.bankAccount.findUnique({
                where: { id: parseInt(id) }
            });
        
            if (!account) {
                return res.status(404).json({
                    status: "error",
                    message: "Account not found"
                });
            }
        
            res.status(200).json({
                status: "success",
                message: "Account retrieved successfully",
                data: account
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: "Failed to retrieve account",
                error: error.message
            });
        }
    }

    static async updateAccount(req, res) {
        try {
            const { id } = req.params;
            const { bankName, bankAccountNumber, balance } = req.body;
        
            const account = await prisma.bankAccount.update({
                where: { id: parseInt(id) },
                data: {
                    bank_name: bankName,
                    bank_account_number: bankAccountNumber,
                    balance: parseFloat(balance)
                }
            });
        
            res.status(200).json({
                status: "success",
                message: "Account updated successfully",
                data: account
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: "Failed to update account",
                error: error.message
            });
        }
    }
    static async deleteAccount(req, res) {
        try {
            const { id } = req.params;
            const account = await prisma.bankAccount.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json({
                status: "success",
                message: "Account deleted successfully",
                data: account
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: "Failed to delete account",
                error: error.message
            });
        }
    }
}

module.exports = AccountControllers;