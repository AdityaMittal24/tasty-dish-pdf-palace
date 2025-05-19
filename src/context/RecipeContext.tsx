
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';
import { useToast } from '@/hooks/use-toast';

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Vegetable Stir Fry',
    description: 'A quick and healthy vegetable stir fry with a savory sauce.',
    ingredients: [
      '2 cups mixed vegetables (bell peppers, broccoli, carrots)',
      '2 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '2 tbsp soy sauce',
      '1 tbsp sesame oil'
    ],
    instructions: [
      'Prepare all vegetables by washing and chopping them into bite-sized pieces.',
      'Heat sesame oil in a wok or large frying pan over medium-high heat.',
      'Add garlic and ginger, stir for 30 seconds until fragrant.',
      'Add vegetables and stir fry for 5-7 minutes until crisp-tender.',
      'Add soy sauce and toss to coat. Serve immediately.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    cookTime: 10,
    prepTime: 15,
    servings: 2,
    isVegetarian: true,
    authorId: '1',
    authorName: 'Demo User',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Grilled Chicken Breast',
    description: 'Juicy grilled chicken breast with herbs and spices.',
    ingredients: [
      '2 chicken breasts',
      '2 tbsp olive oil',
      '1 tsp dried herbs (rosemary, thyme, oregano)',
      'Salt and pepper to taste',
      '1 lemon, sliced'
    ],
    instructions: [
      'Preheat grill to medium-high heat.',
      'Rub chicken breasts with olive oil and season with herbs, salt, and pepper.',
      'Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F.',
      'Let rest for 5 minutes before slicing.',
      'Serve with lemon slices.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    cookTime: 15,
    prepTime: 10,
    servings: 2,
    isVegetarian: false,
    authorId: '1',
    authorName: 'Demo User',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Mushroom Risotto',
    description: 'Creamy mushroom risotto with Parmesan cheese.',
    ingredients: [
      '1 cup Arborio rice',
      '8 oz mushrooms, sliced',
      '1 onion, diced',
      '2 cloves garlic, minced',
      '4 cups vegetable broth',
      '1/2 cup Parmesan cheese, grated',
      '2 tbsp butter',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a large pan, sauté onions and garlic in butter until translucent.',
      'Add mushrooms and cook until they release their moisture.',
      'Add Arborio rice and toast for 2 minutes.',
      'Gradually add warm broth, 1/2 cup at a time, stirring constantly until absorbed before adding more.',
      'After about 20 minutes, when rice is creamy and al dente, stir in Parmesan cheese.',
      'Season with salt and pepper and serve immediately.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    cookTime: 30,
    prepTime: 15,
    servings: 4,
    isVegetarian: true,
    authorId: '2',
    authorName: 'Jane Smith',
    createdAt: new Date().toISOString()
  }
];

interface RecipeContextType {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  deleteRecipe: (id: string) => void;
  setVegetarianFilter: (value: boolean | null) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [vegetarianFilter, setVegetarianFilter] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use our mock data
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    } else {
      setRecipes(mockRecipes);
      localStorage.setItem('recipes', JSON.stringify(mockRecipes));
    }
  }, []);

  useEffect(() => {
    // Apply filtering
    if (vegetarianFilter === null) {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter(recipe => recipe.isVegetarian === vegetarianFilter));
    }
  }, [recipes, vegetarianFilter]);

  const addRecipe = (newRecipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...newRecipeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    
    toast({
      title: "Recipe Added",
      description: "Your recipe has been successfully added.",
    });
  };

  const deleteRecipe = (id: string) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    
    toast({
      title: "Recipe Deleted",
      description: "The recipe has been successfully deleted.",
    });
  };

  return (
    <RecipeContext.Provider 
      value={{ 
        recipes, 
        filteredRecipes, 
        addRecipe, 
        deleteRecipe, 
        setVegetarianFilter 
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
