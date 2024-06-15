const Recipe = require('../models/Recipe');

const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({ ...req.body, author: req.user._id });
    await recipe.save();
    res.status(201).send(recipe);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username email');
    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username email');
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    res.send(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found or not authorized' });
    }
    res.send(recipe);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found or not authorized' });
    }
    res.send(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
};

const favoriteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    if (!recipe.favorited_by.includes(req.user._id)) {
      recipe.favorited_by.push(req.user._id);
      await recipe.save();
    }
    res.send(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
};


const unfavoriteRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).send({ error: 'Recipe not found' });
      }
      recipe.favorited_by = recipe.favorited_by.filter(
        (userId) => !userId.equals(req.user._id)
      );
      await recipe.save();
      res.send(recipe);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    favoriteRecipe,
    unfavoriteRecipe,
  };