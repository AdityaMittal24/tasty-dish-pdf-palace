
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '@/context/RecipeContext';
import { useAuth } from '@/context/AuthContext';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import RecipeEditForm from '@/components/recipes/RecipeEditForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes, deleteRecipe } = useRecipes();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold">Recipe Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The recipe you're looking for doesn't exist or has been deleted.
        </p>
        <Button className="mt-6" onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    );
  }

  const isOwner = currentUser?.id === recipe.authorId;

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigate('/');
    toast({
      title: "Recipe Deleted",
      description: "Your recipe has been successfully deleted.",
    });
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6" 
        />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold">{recipe.title}</h1>
          
          {isOwner && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex gap-1 hover:bg-recipe-cream"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} />
                <span>Edit</span>
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex gap-1 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      recipe "{recipe.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        
        <div className="bg-recipe-cream/20 p-6 rounded-lg mb-6">
          <p className="text-lg mb-4">{recipe.description}</p>
          
          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium block">Prep Time</span>
              <span>{recipe.prepTime} min</span>
            </div>
            <div>
              <span className="font-medium block">Cook Time</span>
              <span>{recipe.cookTime} min</span>
            </div>
            <div>
              <span className="font-medium block">Servings</span>
              <span>{recipe.servings}</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-heading font-bold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted-foreground">{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-heading font-bold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-muted-foreground">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <RecipeEditForm recipe={recipe} onClose={() => setIsEditing(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RecipeDetail;
