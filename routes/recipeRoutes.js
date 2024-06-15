const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  favoriteRecipe,
  unfavoriteRecipe,
} = require('../controllers/recipeController');

router.post('/', auth, createRecipe);
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', auth, updateRecipe);
router.delete('/:id', auth, deleteRecipe);
router.post('/:id/favorite', auth, favoriteRecipe);
router.post('/:id/unfavorite', auth, unfavoriteRecipe);

module.exports = router;