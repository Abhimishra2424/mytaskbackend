
const jwt = require('jsonwebtoken');
require("dotenv").config();
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded.payload.employee) {
        req.employee = decoded.payload.employee;
        next();
      }else{
        req.company = decoded.payload.company;
        next()
      }
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

module.exports = auth;