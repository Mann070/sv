
'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';

export type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A default user so the app doesn't break.
const defaultUser: User = { name: 'Aravind', email: 'aravind@example.com' };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signIn = () => {
    // No validation, just set a user and go to dashboard
    setUser(defaultUser);
    router.push('/dashboard');
  };

  const signOut = () => {
    setUser(null);
    router.push('/');
  };

  // The user is always "authenticated" in this simplified setup when on the app pages.
  // We can derive this from the user object.
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
