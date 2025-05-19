
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import AddRecipeForm from '@/components/recipes/AddRecipeForm';
import { useAuth } from '@/context/AuthContext';
import { useRecipes } from '@/context/RecipeContext';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { setVegetarianFilter } = useRecipes();
  const [currentFilter, setCurrentFilter] = useState<boolean | null>(null);
  
  const handleFilterChange = (value: boolean | null) => {
    setCurrentFilter(value);
    setVegetarianFilter(value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      
      <main className="flex-grow container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-2xl font-heading font-bold mb-4 md:mb-0">
            Our Recipes
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <RecipeFilters onFilterChange={handleFilterChange} currentFilter={currentFilter} />
            
            {isAuthenticated && <AddRecipeForm />}
          </div>
        </div>
        
        <RecipeGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
