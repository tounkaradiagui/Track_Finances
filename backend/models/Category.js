const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       enum: [
            "Alimentation",
            "Santé",
            "Loisirs",
            "Transports",
            "Logement",
            "Salaires",
            "Assurances",
            "Impôts et taxes",
            "Autres"
        ]
    },
    description: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, { collection: "Category", timestamps: true });

CategorySchema.index({ userId: 1, name: 1 }, { unique: true });

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;