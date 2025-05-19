
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  isVegetarian: boolean;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
