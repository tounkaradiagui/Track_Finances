const express = require('express');
const {newGoal, saveForGoal, getGoals, checkProgress, showSingleGoal} = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/my-goal', authMiddleware, newGoal);
router.get('/show-goal/:id', authMiddleware, showSingleGoal);
router.post('/my-goal/saving/:id', authMiddleware, saveForGoal);
router.get('/my-goal/:userId', authMiddleware, getGoals);
router.get('/my-goal/:id/progress', authMiddleware, checkProgress);


module.exports = router;