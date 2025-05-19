
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebaseConfig';
import { User } from '../types/recipe';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
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

// Admin credentials
const ADMIN_EMAIL = "admin@tastybytes.com";
const ADMIN_PASSWORD = "admin123"; // In a real app, this would never be hardcoded

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('recipeUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.email === ADMIN_EMAIL);
    }
    
    // Set up Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || ''
        };
        localStorage.setItem('recipeUser', JSON.stringify(user));
        setCurrentUser(user);
        setIsAuthenticated(true);
        setIsAdmin(user.email === ADMIN_EMAIL);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user: User = {
        id: userCredential.user.uid,
        name: userCredential.user.displayName || 'User',
        email: userCredential.user.email || ''
      };
      
      localStorage.setItem('recipeUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.email === ADMIN_EMAIL);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to TastyBytes!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Incorrect email or password",
        variant: "destructive",
      });
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user: User = {
        id: result.user.uid,
        name: result.user.displayName || 'Google User',
        email: result.user.email || ''
      };
      
      localStorage.setItem('recipeUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.email === ADMIN_EMAIL);
      
      toast({
        title: "Google Login Successful",
        description: "Welcome to TastyBytes!",
      });
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: "Could not sign in with Google",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user: User = {
        id: userCredential.user.uid,
        name: name,
        email: email
      };
      
      localStorage.setItem('recipeUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(email === ADMIN_EMAIL);
      
      toast({
        title: "Registration Successful",
        description: "Welcome to TastyBytes!",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Could not create account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('recipeUser');
      setCurrentUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    });
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      isAdmin,
      login, 
      loginWithGoogle, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
