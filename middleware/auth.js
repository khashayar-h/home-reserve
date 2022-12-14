const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req,res,next) {
    const token = req.cookies.auth;
    if(!token) return res.status(401).send('Access Denied ! no token passed');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next()
    }
    catch(ex) {
        res.status(400).send('Invalid Token !')
    }
}