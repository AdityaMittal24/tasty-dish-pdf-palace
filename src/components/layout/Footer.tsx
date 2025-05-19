
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-recipe-navy text-white py-8 mt-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-heading font-bold">
              <span className="text-recipe-terracotta">Tasty</span>Bytes
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Discover, create, and share amazing recipes
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
            <div>
              <h3 className="text-recipe-yellow font-medium mb-2">Explore</h3>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="hover:text-white"><a href="#">Recipes</a></li>
                <li className="hover:text-white"><a href="#">Categories</a></li>
                <li className="hover:text-white"><a href="#">Popular</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-recipe-yellow font-medium mb-2">About</h3>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="hover:text-white"><a href="#">Our Story</a></li>
                <li className="hover:text-white"><a href="#">Contact</a></li>
                <li className="hover:text-white"><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-6 pt-6 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} TastyBytes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
