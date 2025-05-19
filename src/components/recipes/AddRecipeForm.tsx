
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRecipes } from '@/context/RecipeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

const AddRecipeForm: React.FC = () => {
  const { currentUser } = useAuth();
  const { addRecipe } = useRecipes();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    cookTime: 0,
    prepTime: 0,
    servings: 1,
    isVegetarian: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, isVegetarian: checked });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) || 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to add a recipe",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.title || !formData.description || !formData.ingredients || !formData.instructions) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Parse ingredients and instructions from text areas into arrays
    const ingredients = formData.ingredients
      .split('\n')
      .filter(item => item.trim() !== '');
      
    const instructions = formData.instructions
      .split('\n')
      .filter(item => item.trim() !== '');
    
    addRecipe({
      title: formData.title,
      description: formData.description,
      ingredients,
      instructions,
      imageUrl: formData.imageUrl,
      cookTime: formData.cookTime,
      prepTime: formData.prepTime,
      servings: formData.servings,
      isVegetarian: formData.isVegetarian,
      authorId: currentUser.id,
      authorName: currentUser.name
    });
    
    // Reset form and close dialog
    setFormData({
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      cookTime: 0,
      prepTime: 0,
      servings: 1,
      isVegetarian: false
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-recipe-terracotta hover:bg-recipe-terracotta/90">
          <Plus size={16} />
          <span>Add Recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Add New Recipe</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Pasta Primavera"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe your recipe"
              required
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prepTime">Prep Time (minutes)</Label>
              <Input
                id="prepTime"
                name="prepTime"
                type="number"
                min="0"
                value={formData.prepTime.toString()}
                onChange={handleNumberChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cookTime">Cook Time (minutes)</Label>
              <Input
                id="cookTime"
                name="cookTime"
                type="number"
                min="0"
                value={formData.cookTime.toString()}
                onChange={handleNumberChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                name="servings"
                type="number"
                min="1"
                value={formData.servings.toString()}
                onChange={handleNumberChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients * (one per line)</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="1 cup flour
2 eggs
..."
              required
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions * (one step per line)</Label>
            <Textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="1. Preheat oven to 350°F
2. Mix the ingredients
..."
              required
              rows={4}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isVegetarian"
              checked={formData.isVegetarian}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isVegetarian">Vegetarian Recipe</Label>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="mt-4"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="mt-4 bg-recipe-sage hover:bg-recipe-sage/90"
            >
              Add Recipe
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipeForm;
