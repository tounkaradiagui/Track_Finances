const express = require('express');
const {newGoal, saveForGoal, getGoals, checkProgress} = require('../controllers/goalController');
const router = express.Router();

router.post('/my-goal', newGoal);
router.post('/my-goal/:id/savings', saveForGoal);
router.get('/my-goals/:userId', getGoals);
router.get('/my-goals/:id/progress', checkProgress);

module.exports = router;