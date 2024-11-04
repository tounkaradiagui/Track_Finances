const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createBudget, getBudgets, updateBudget, deleteBudget, getBudgetById } = require('../controllers/budgetController');

router.post('/create', authMiddleware, createBudget);
router.get('/all', authMiddleware, getBudgets);
router.get('/show-budget/:id', authMiddleware, getBudgetById);
router.put('/:budgetId', authMiddleware, updateBudget);
router.delete('/delete/:budgetId', authMiddleware, deleteBudget);

module.exports = router;