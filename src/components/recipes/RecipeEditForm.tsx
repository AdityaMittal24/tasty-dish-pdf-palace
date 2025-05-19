
import React, { useState } from 'react';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useRecipes } from '@/context/RecipeContext';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface RecipeEditFormProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeEditForm: React.FC<RecipeEditFormProps> = ({ recipe, onClose }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl);
  const [ingredientsText, setIngredientsText] = useState(recipe.ingredients.join('\n'));
  const [instructionsText, setInstructionsText] = useState(recipe.instructions.join('\n'));
  const [prepTime, setPrepTime] = useState(recipe.prepTime.toString());
  const [cookTime, setCookTime] = useState(recipe.cookTime.toString());
  const [servings, setServings] = useState(recipe.servings.toString());
  const [isVegetarian, setIsVegetarian] = useState(recipe.isVegetarian);
  
  const { recipes, setVegetarianFilter } = useRecipes();
  const { toast } = useToast();
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Parse ingredients and instructions from text areas
    const ingredients = ingredientsText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');
      
    const instructions = instructionsText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');
    
    // Create updated recipe
    const updatedRecipe: Recipe = {
      ...recipe,
      title,
      description,
      imageUrl,
      ingredients,
      instructions,
      prepTime: parseInt(prepTime) || 0,
      cookTime: parseInt(cookTime) || 0,
      servings: parseInt(servings) || 1,
      isVegetarian
    };
    
    // Update recipe in context
    const updatedRecipes = recipes.map(r => 
      r.id === recipe.id ? updatedRecipe : r
    );
    
    // Save to localStorage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    
    toast({
      title: "Recipe Updated",
      description: "Your recipe has been successfully updated."
    });
    
    onClose();
    
    // Refresh the page to show updated recipe
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  
  return (
    <div>
      <DialogHeader className="mb-4">
        <DialogTitle>Edit Recipe</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="title">Recipe Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="prepTime">Prep Time (minutes)</Label>
              <Input
                id="prepTime"
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="cookTime">Cook Time (minutes)</Label>
              <Input
                id="cookTime"
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isVegetarian"
              checked={isVegetarian}
              onCheckedChange={setIsVegetarian}
            />
            <Label htmlFor="isVegetarian">Vegetarian Recipe</Label>
          </div>
          
          <div>
            <Label htmlFor="ingredients">
              Ingredients (one per line)
            </Label>
            <Textarea
              id="ingredients"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              className="min-h-[150px]"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="instructions">
              Instructions (one step per line)
            </Label>
            <Textarea
              id="instructions"
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              className="min-h-[150px]"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default RecipeEditForm;
