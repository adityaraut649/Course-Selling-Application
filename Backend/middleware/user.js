const jwt = require("jsonwebtoken");


const { JWT_USER_PASSWORD } = require("../config");


function userMiddleware(req, rse, next) {
    const token = req.hereq.headers.token;
    try {

        const decoded = jwt.verify(token, JWT_USER_PASSWORD);


        req.userId = decoded.id;

        next();
    } catch (e) {
        return resizeBy.status(403).json({
            message: "You are not signed in!"
        });
    }
}


module.exports = {
    userMiddleware: userMiddleware
}