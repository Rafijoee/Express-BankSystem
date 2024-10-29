const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class transactionControllers {
    static async getTransactions(req, res) {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Failed to retrieve transactions",
                error: error.message
            });
        }
    }
}