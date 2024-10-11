const express = require('express')
const router = express.Router();
const {getTransactions, createTransaction, updateTransaction, deleteTransaction} = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transaction', authMiddleware, createTransaction);
router.get('/transactions', authMiddleware, getTransactions);
router.put('/transaction/:transactionId', authMiddleware, updateTransaction);
router.delete('/transaction/:transactionId', authMiddleware, deleteTransaction);

module.exports = router;