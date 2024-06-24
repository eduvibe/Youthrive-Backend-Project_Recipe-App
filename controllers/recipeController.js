const Recipe = require('../models/Recipe');

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('author', 'username');
        res.send(recipes);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching recipes', error });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe Id not found, Try again' });
        }
        res.send(recipe);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching recipe', error });
    }
};

const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, categories, tags } = req.body;
        const recipe = new Recipe(
        { title, ingredients, instructions, categories, tags, author: req.user.id });
        await recipe.save();
        res.status(201).send({ message: 'Recipe created successfully', recipe });
    } catch (error) {
        res.status(500).send({ message: 'Could not create recipe', error });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, categories, tags } = req.body;
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, 
        { title, ingredients, instructions, categories, tags }, { new: true });
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe was not found' });
        }
        res.send({ message: 'Recipe has been updated successfully', recipe });
    } catch (error) {
        res.status(500).send({ message: 'unable to update recipe', error });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' });
        }
        res.send({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting recipe', error });
    }
};

module.exports = { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe };
