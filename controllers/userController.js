const User = require('../models/User');

const favoriteRecipe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (!user.favorites.includes(req.params.recipeId)) {
            user.favorites.push(req.params.recipeId);
            await user.save();
        }
        res.send({ message: 'Recipe added to favorites' });
    } catch (error) {
        res.status(500).send({ message: 'Error adding favorite', error });
    }
};

const unfavoriteRecipe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        user.favorites = user.favorites.filter(recipeId => recipeId.toString() !== req.params.recipeId);
        await user.save();
        res.send({ message: 'Recipe removed from favorites' });
    } catch (error) {
        res.status(500).send({ message: 'Error removing favorite', error });
    }
};

module.exports = { favoriteRecipe, unfavoriteRecipe };
