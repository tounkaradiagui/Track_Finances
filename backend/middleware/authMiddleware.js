const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/generateToken'); // Adjust this to where you store your secret key

const authMiddleware = (req, res, next) => {
    const token = req.cookies.Authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Votre session a expirée, veuillez vous reconnecter !" });
    }

    jwt.verify(token, secretKey, (err, decoded) => { // Use the actual secret key here
        if (err) {
            return res.status(403).json({ message: "Token invalide" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;