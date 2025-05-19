
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/recipe';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('recipeUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would be an API call
    // For demo purposes, we'll just create a mock user
    const mockUser: User = {
      id: '1',
      name: 'Demo User',
      email: email
    };
    
    localStorage.setItem('recipeUser', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock register - in a real app, this would be an API call
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email
    };
    
    localStorage.setItem('recipeUser', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('recipeUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
