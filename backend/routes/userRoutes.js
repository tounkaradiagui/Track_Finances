const express = require('express')
const router = express.Router();
const {Register, Login, UpdateUserProfile, DeleteUserAccount, ForgotPassword, Logout, ChangePassword, ResetPassword, protectedData, getUserById} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Définition d'une route de base faculttatif qui renvoie un message pour tester le serveur
router.get('/test', (req, res) => {
    res.send("Le backend est prêt pour la connexion")
});

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.patch('/user/profile/:userId', authMiddleware, UpdateUserProfile);
// router.get('/user/:userId',authMiddleware, adminMiddleware, getUserById);
router.delete('/user/profile/:userId', authMiddleware, DeleteUserAccount);
router.post('/user/forgot-password/:token', authMiddleware, ForgotPassword);
router.post('/user/reset-password/:token', authMiddleware, ResetPassword);
router.post('/user/profile/change-password', authMiddleware, ChangePassword);
router.get('/protected', authMiddleware, protectedData);

module.exports = router;