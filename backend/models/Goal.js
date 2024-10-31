const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    targetAmount: {type: Number, required:true},
    deadline: {
        type: Date,
        required: true,
        set: (value) => {
            if (typeof value === 'string') {
                const [day, month, year] = value.split('/');
                return new Date(`${year}-${month}-${day}`);
            }
            return value;
        },
    },
    currentSaved: {type: Number, default: 0},
    description:{type: String, required:false},
    frequency: {type: String, enum: ['Journalière', 'Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle'], required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, { collection: "Goal", timestamps: true });


const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;