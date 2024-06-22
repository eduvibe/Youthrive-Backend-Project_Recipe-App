require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    dbUri: process.env.DB_URI
};
