const express = require('express');
const router = express.Router();
const 
{ 
    getRecipes, 
    getRecipeById, 
    createRecipe, 
    updateRecipe, 
    deleteRecipe 
} = require('../controllers/recipeController');

const authMiddleware = require('../middlewares/authMiddleware');

//Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipeById);

//Protected routes (Users need to be authenticated first to access the these routes)
router.post('/', authMiddleware, createRecipe);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);

module.exports = router;
