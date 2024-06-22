const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config/config');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.decode(token, config.jwtSecret);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send({ message: 'Invalid token.' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.', error });
    }
};

module.exports = authMiddleware;
