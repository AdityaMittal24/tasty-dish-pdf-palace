
import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/types/recipe';
import { useRecipes } from '@/context/RecipeContext';

const RecipeGrid: React.FC = () => {
  const { filteredRecipes, deleteRecipe } = useRecipes();
  
  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">No recipes found</h3>
        <p className="mt-2">Try changing your filters or add a new recipe!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
