const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'udl*VFMnxp5Crly-({');
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error | 'Requête non-authentifiée !'
        })
    }
};

