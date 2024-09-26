const express = require('express')
const router = express.Router();
const {Register, Login, UpdateUserProfile} = require('../controllers/userController')

// Définition d'une route de base faculttatif qui renvoie un message pour tester le serveur
router.get('/test', (req, res) => {
    res.send("Le backend est prêt pour la connexion")
});

router.post('/register', Register);
router.post('/login', Login);
router.put('/user/:userId', UpdateUserProfile);


module.exports = router;