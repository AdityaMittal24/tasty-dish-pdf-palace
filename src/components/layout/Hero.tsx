
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import AddRecipeForm from '../recipes/AddRecipeForm';
import AuthModal from '../auth/AuthModal';

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="py-12 md:py-16 lg:py-20 bg-recipe-cream/30">
      <div className="container-custom text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-recipe-navy mb-4">
          Discover & Share <span className="text-recipe-terracotta">Delicious</span> Recipes
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Browse our collection of mouthwatering recipes, filter by dietary preferences, 
          save your favorites, and share your culinary creations.
        </p>
        
        <div className="flex justify-center gap-4">
          {isAuthenticated ? (
            <AddRecipeForm />
          ) : (
            <AuthModal defaultTab="register" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
