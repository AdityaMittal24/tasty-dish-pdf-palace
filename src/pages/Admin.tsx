
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRecipes } from '@/context/RecipeContext';
import { Recipe } from '@/types/recipe';
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
import { PlusCircle, Trash2, Edit, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { recipes, deleteRecipe } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteRecipe(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Admin Panel</h1>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-recipe-sage hover:bg-recipe-sage/90"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Recipe
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Recipe Name</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Servings</TableHead>
                <TableHead className="text-center">Time (min)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe: Recipe) => (
                  <TableRow key={recipe.id}>
                    <TableCell className="font-medium">{recipe.title}</TableCell>
                    <TableCell>{recipe.authorName}</TableCell>
                    <TableCell>
                      <Badge variant={recipe.isVegetarian ? "outline" : "secondary"} 
                        className={recipe.isVegetarian ? "border-recipe-sage text-recipe-sage" : ""}>
                        {recipe.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{recipe.servings}</TableCell>
                    <TableCell className="text-center">{recipe.prepTime + recipe.cookTime}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2 text-xs"
                        onClick={() => handleEdit(recipe.id)}
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2 text-xs hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the
                              recipe "{recipe.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(recipe.id)}
                              className="bg-destructive text-destructive-foreground"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "No recipes match your search" : "No recipes found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
