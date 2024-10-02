const express = require('express')
const router = express.Router();
const {Register, Login, UpdateUserProfile, DeleteUserAccount, ForgotPassword, Logout, ChangePassword, ResetPassword} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Définition d'une route de base faculttatif qui renvoie un message pour tester le serveur
router.get('/test', (req, res) => {
    res.send("Le backend est prêt pour la connexion")
});

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.put('/user/profile/:userId', authMiddleware, UpdateUserProfile);
router.delete('/user/profile/:userId', authMiddleware, DeleteUserAccount);
router.post('/user/forgot-password/:token', authMiddleware, ForgotPassword);
router.post('/user/reset-password/:token', authMiddleware, ResetPassword);
router.post('/user/change-password', authMiddleware, ChangePassword);

module.exports = router;