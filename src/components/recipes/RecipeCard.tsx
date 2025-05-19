
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/recipe';
import { Clock, Users, Download, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { generatePDF } from '@/utils/pdfGenerator';
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

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onDelete }) => {
  const { currentUser } = useAuth();
  const isOwner = currentUser?.id === recipe.authorId;
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    generatePDF(recipe);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="block h-full">
      <Card className="recipe-card overflow-hidden h-full flex flex-col border border-border/50 hover:shadow-md transition-shadow duration-200">
        <div className="h-48 overflow-hidden">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
        
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{recipe.title}</CardTitle>
              <CardDescription className="line-clamp-2 mt-1">{recipe.description}</CardDescription>
            </div>
            <Badge variant={recipe.isVegetarian ? "outline" : "secondary"} 
              className={recipe.isVegetarian ? "border-recipe-sage text-recipe-sage" : ""}>
              {recipe.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-grow">
          <div className="flex items-center text-sm text-muted-foreground gap-4 my-2">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 flex justify-between border-t bg-muted/20">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex gap-1 hover:bg-recipe-cream"
            onClick={handleDownload}
          >
            <Download size={14} />
            <span>Download</span>
          </Button>
          
          {isOwner && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs flex gap-1 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={handleDelete}
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    recipe "{recipe.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(recipe.id);
                    }} 
                    className="bg-destructive text-destructive-foreground"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
