const express = require('express')
const router = express.Router();
const {getCategories, addCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/categories', authMiddleware, getCategories);
router.post('/category', authMiddleware, addCategory);
router.put('/category/:categoryId', authMiddleware, updateCategory);
router.delete('/category/:categoryId', authMiddleware, deleteCategory);


module.exports = router;