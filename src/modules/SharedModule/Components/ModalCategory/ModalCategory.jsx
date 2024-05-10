import React, { useState } from 'react';

const ModalCategory = () => {
  // State to track which rows have been clicked
  const [likedRecipes, setLikedRecipes] = useState([]);

  // Function to handle click on heart icon
  const handleLikeClick = (recipeId) => {
    if (likedRecipes.includes(recipeId)) {
      // Remove from likedRecipes if already liked
      setLikedRecipes(likedRecipes.filter(id => id !== recipeId));
    } else {
      // Add to likedRecipes if not already liked
      setLikedRecipes([...likedRecipes, recipeId]);
    }
  };

  // Sample recipe data
  const recipes = [
    { id: 1, name: 'Recipe 1' },
    { id: 2, name: 'Recipe 2' },
    { id: 3, name: 'Recipe 3' },
  ];

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            {recipe.name}
            {/* Heart icon with conditional styling */}
            <span
              className={likedRecipes.includes(recipe.id) ? 'heart red' : 'heart'}
              onClick={() => handleLikeClick(recipe.id)}
            >
              ❤️
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalCategory;
