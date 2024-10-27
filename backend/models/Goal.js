const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    targetAmount: {type: Number, required:true},
    deadline: {type: Date, required: true},
    currentSaved: {type: Number, default: 0},
    frequency: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, { collection: "Goal", timestamps: true });

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;