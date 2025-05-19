
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '../auth/AuthModal';
import { User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-border/40 py-4">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-heading font-bold text-recipe-navy">
            <span className="text-recipe-terracotta">Tasty</span>Bytes
          </Link>
        </div>
        
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link to="/admin">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 hover:bg-recipe-cream"
                  >
                    <Settings size={16} />
                    <span className="hidden md:inline">Admin Panel</span>
                  </Button>
                </Link>
              )}
              
              <div className="flex items-center gap-2">
                <User size={18} className="text-muted-foreground" />
                <span className="font-medium hidden md:inline-block">{currentUser?.name}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="flex items-center gap-1 hover:bg-recipe-cream"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <AuthModal />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
