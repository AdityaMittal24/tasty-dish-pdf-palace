
import { Recipe } from '../types/recipe';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// This is a workaround for TypeScript as jsPDF-autotable adds autoTable to jsPDF's prototype
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generatePDF = (recipe: Recipe) => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Set font size and add title
  doc.setFontSize(20);
  doc.text(recipe.title, pageWidth / 2, 20, { align: 'center' });
  
  // Add metadata
  doc.setFontSize(10);
  doc.text(`By: ${recipe.authorName} • Created: ${new Date(recipe.createdAt).toLocaleDateString()}`, pageWidth / 2, 28, { align: 'center' });
  
  // Add vegetarian indicator
  doc.setFontSize(12);
  doc.text(`${recipe.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'} Recipe`, pageWidth / 2, 35, { align: 'center' });
  
  // Add description
  doc.setFontSize(12);
  doc.text('Description:', 14, 45);
  
  const splitDescription = doc.splitTextToSize(recipe.description, pageWidth - 30);
  doc.setFontSize(10);
  doc.text(splitDescription, 14, 52);
  
  let yPosition = 52 + splitDescription.length * 7;
  
  // Add cooking information
  doc.setFontSize(12);
  doc.text('Cooking Information:', 14, yPosition);
  yPosition += 7;
  
  doc.setFontSize(10);
  doc.text(`Prep Time: ${recipe.prepTime} minutes`, 14, yPosition);
  yPosition += 5;
  doc.text(`Cook Time: ${recipe.cookTime} minutes`, 14, yPosition);
  yPosition += 5;
  doc.text(`Total Time: ${recipe.prepTime + recipe.cookTime} minutes`, 14, yPosition);
  yPosition += 5;
  doc.text(`Servings: ${recipe.servings}`, 14, yPosition);
  yPosition += 10;
  
  // Add ingredients
  doc.setFontSize(12);
  doc.text('Ingredients:', 14, yPosition);
  yPosition += 7;
  
  doc.setFontSize(10);
  recipe.ingredients.forEach((ingredient) => {
    doc.text(`• ${ingredient}`, 14, yPosition);
    yPosition += 6;
  });
  
  yPosition += 5;
  
  // Add instructions
  doc.setFontSize(12);
  doc.text('Instructions:', 14, yPosition);
  yPosition += 7;
  
  doc.setFontSize(10);
  recipe.instructions.forEach((instruction, index) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.text(`${index + 1}. ${instruction}`, 14, yPosition);
    yPosition += 7;
  });
  
  // Save the PDF
  doc.save(`${recipe.title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};
