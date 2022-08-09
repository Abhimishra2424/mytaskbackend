
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, "abhishekmishra");
      req.company = decoded.payload.company;
      next()
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

module.exports = auth;