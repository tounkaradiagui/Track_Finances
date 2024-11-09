const express = require('express')
const router = express.Router();
const {Register, Login, UpdateUserProfile, DeleteUserAccount, Logout, ChangePassword, ResetPassword, protectedData, getUserById, requestPasswordReset, upload,} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.patch('/user/profile/:userId', authMiddleware, upload, UpdateUserProfile);
// router.get('/user/:userId',authMiddleware, adminMiddleware, getUserById);
router.delete('/user/profile/:userId', authMiddleware, DeleteUserAccount);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', ResetPassword);
router.post('/user/profile/change-password', authMiddleware, ChangePassword);
router.get('/protected', authMiddleware, protectedData);

module.exports = router;