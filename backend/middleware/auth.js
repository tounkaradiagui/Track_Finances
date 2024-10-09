const jwt = require("jsonwebtoken");
const secretKey = require('../controllers/userController')

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json("You are not authenticated!");
//   }
// };

// const authMiddleware = (req, res, next) => {
//     const token = req.cookies.Authorization; // Vérifie le cookie

//     console.log("Token reçu : ", token);
//     console.log("Cookies dans la requête : ", req.cookies);

//     if (!token) {
//         return res.status(401).json({ message: "Accès refusé. Token non fourni" });
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey); // Vérification directe du token
//         req.user = decoded; // Ajoute l'utilisateur à la requête
//         next(); // Passe à la prochaine étape
//     } catch (error) {
//         console.log("Erreur : ", error);
//         return res.status(401).json({ message: "Accès refusé. Token invalide ou expiré" });
//     }
// };

module.exports = { verifyToken, authMiddleware };
