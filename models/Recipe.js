const mongoose = require('mongoose');
const config = require ('../config/config')

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [String],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);