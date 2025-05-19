
# Tasty Dish PDF Palace - Recipe App

A modern recipe application that allows users to create, browse, and download recipes as PDFs. Built with React, TypeScript, and Firebase authentication.

## Features

- Create and browse recipes
- Download recipes as PDFs
- Filter recipes by vegetarian/non-vegetarian
- User authentication with email/password and Google sign-in
- Responsive design for all device sizes
- Delete your own recipes

## Setup and Installation

Follow these steps to set up and run the project:

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation Steps

1. Clone the repository
   ```
   git clone <repository-url>
   cd tasty-dish-pdf-palace
   ```

2. Install dependencies
   ```
   npm install
   ```
   
   If you encounter any dependency errors, try:
   ```
   npm install --legacy-peer-deps
   ```
   
   Or:
   ```
   npm install --force
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Firebase Authentication

This app uses Firebase for authentication. The configuration is already set up in the codebase.

## Using the App

- **Browse Recipes**: View all recipes on the home page
- **Filter Recipes**: Use the filter options to show vegetarian or non-vegetarian recipes
- **Add Recipes**: Click the "Add Recipe" button (requires login)
- **Download Recipes**: Click the "Download" button on any recipe card to save as PDF
- **Delete Recipes**: Recipe owners can delete their own recipes using the delete button

## Troubleshooting

If you encounter build errors:

1. Make sure all dependencies are installed correctly:
   ```
   npm install @vitejs/plugin-react --save-dev
   ```

2. If you're getting SWC binding errors:
   - The project has been configured to use standard React plugin instead of SWC
   - Try using a different Node.js version if problems persist
   - Clear node_modules and reinstall with `npm clean-install`

3. For other errors:
   - Check console logs for specific error messages
   - Make sure your Firebase configuration is correct
   - Verify that all required environment variables are set

## Project Structure

- `src/components`: React components
- `src/context`: Context providers for authentication and recipes
- `src/pages`: Page components
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions including PDF generation

## License

MIT
