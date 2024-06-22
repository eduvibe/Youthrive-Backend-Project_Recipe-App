const express = require('express');
const router = express.Router();
const { favoriteRecipe, unfavoriteRecipe } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/favorite/:recipeId', authMiddleware, favoriteRecipe);
router.delete('/unfavorite/:recipeId', authMiddleware, unfavoriteRecipe);

module.exports = router;