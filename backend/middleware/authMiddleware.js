const jwt = require('jsonwebtoken');
const { secretKey } = require('../controllers/userController');

const authMiddleware = (req, res, next) => {
    // Vérifier s'il y a un token dans les cookies
    const token = req.cookies.Authorization; // Récupérer le cookie Authorization

    console.log("Token reçu : ", token);
    console.log("Cookies dans la requête : ", req.cookies);

    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Token non fourni" });
    }

    // Vérifier si le token commence par 'Bearer '
    if (token.startsWith('Bearer ')) {
        const actualToken = token.split(' ')[1]; // Récupérer uniquement le token

        if (!actualToken) {
            return res.status(401).json({ message: "Accès refusé. Token manquant" });
        }

        try {
            // Déchiffrer le token
            const decoded = jwt.verify(actualToken, secretKey);
            console.log("Token décodé: ", decoded);
            // Ajouter l'utilisateur à la requête
            req.user = decoded;
            // Passer à la prochaine étape
            next();
        } catch (error) {
            console.log("Erreur : ", error);
            return res.status(401).json({ message: "Accès refusé. Token invalid ou expiré" });
        }
    } else {
        return res.status(401).json({ message: "Accès refusé. Format du token invalide" });
    }
};


module.exports = authMiddleware;
