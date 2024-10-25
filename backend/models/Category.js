const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
}, { collection: "Category", timestamps: true });

CategorySchema.index({ userId: 1, name: 1 }, { unique: true });

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;