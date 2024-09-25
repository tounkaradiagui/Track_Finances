const express = require('express')
const router = express.Router();
const {Register, Login} = require('../controllers/userController')


router.post('/register', Register);
router.get('/', (req, res) => {
    res.send("Le backend est prêt pour la connexion")
});
router.post('/login', Login);

module.exports = router;