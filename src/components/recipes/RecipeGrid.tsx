
import React from 'react';
import RecipeCard from './RecipeCard';
import { useRecipes } from '@/context/RecipeContext';
import { useAuth } from '@/context/AuthContext';
import AddRecipeForm from './AddRecipeForm';

const RecipeGrid: React.FC = () => {
  const { filteredRecipes, deleteRecipe } = useRecipes();
  const { isAuthenticated } = useAuth();
  
  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-recipe-cream/30 rounded-lg shadow-sm">
        <h3 className="text-xl font-medium text-muted-foreground">No recipes found</h3>
        <p className="mt-2 text-muted-foreground">Try changing your filters or add a new recipe!</p>
        
        {isAuthenticated && (
          <div className="mt-6">
            <AddRecipeForm />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredRecipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onDelete={deleteRecipe} 
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
