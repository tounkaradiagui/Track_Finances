const express = require('express')
const router = express.Router();
const {Register, Login, UpdateUserProfile, DeleteUserAccount, ForgotPassword} = require('../controllers/userController')

// Définition d'une route de base faculttatif qui renvoie un message pour tester le serveur
router.get('/test', (req, res) => {
    res.send("Le backend est prêt pour la connexion")
});

router.post('/register', Register);
router.post('/login', Login);
router.put('/user/profile/:userId', UpdateUserProfile);
router.delete('/user/profile/:userId', DeleteUserAccount);
router.post('/user/forgot-password/:token', ForgotPassword);


module.exports = router;