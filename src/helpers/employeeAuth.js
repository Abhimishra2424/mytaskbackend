
const jwt = require('jsonwebtoken');

const employeeAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    const token = authHeader.split(' ')[1]
    try {
      const  decoded = jwt.verify(token, "abhishekmishra");
      if(decoded.payload.company){
        req.employee = ""
        next()
      }else{
        req.employee = decoded.payload.employee;
        next()
      }
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

module.exports = employeeAuth;