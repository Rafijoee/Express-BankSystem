const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        // console.log(authorization)
        if (!authorization) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        } else {
            jwt.verify(authorization, JWT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(401).json({
                        message: "Unauthorized"
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}

