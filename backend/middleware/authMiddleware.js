const jwt = require('jsonwebtoken');
const { secretKey } = require('../controllers/userController');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.Authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Accès non autorisé" });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token invalide" });
      }
      req.user = decoded;
      next();
    });
};
  

module.exports = authMiddleware;