
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
  role: 'patient' | 'doctor' | 'admin';
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string, role: 'patient' | 'doctor' | 'admin') => { ok: boolean; message?: string };
  signUp: (user: { name: string; email: string; password: string; role: 'patient' | 'doctor' }) => { ok: boolean; message?: string };
  signOut: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A default user so the app doesn't break.
const defaultUser: User = { name: 'Aravind', email: 'aravind@example.com', role: 'patient' };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signIn = (
    email: string,
    password: string,
    role: 'patient' | 'doctor' | 'admin'
  ) => {
    setIsLoading(true);
    try {
      const raw = localStorage.getItem('users');
      const users: Array<any> = raw ? JSON.parse(raw) : [];

      const found = users.find((u) => u.email === email);
      if (!found) {
        setIsLoading(false);
        return { ok: false, message: 'Email not registered. Please sign up first.' };
      }

      if (found.role !== role) {
        setIsLoading(false);
        return { ok: false, message: `This account is registered as a ${found.role}. Use the correct portal.` };
      }

      if (found.password !== password) {
        setIsLoading(false);
        return { ok: false, message: 'Invalid credentials.' };
      }

      const authUser: User = { name: found.name, email: found.email, role: found.role };
      setUser(authUser);
      localStorage.setItem('authUser', JSON.stringify(authUser));
      setIsLoading(false);

      // redirect based on role
      if (found.role === 'patient') router.push('/dashboard');
      else if (found.role === 'doctor') router.push('/admin');
      else router.push('/');

      return { ok: true };
    } catch (err) {
      setIsLoading(false);
      return { ok: false, message: 'An error occurred' };
    }
  };

  const signUp = ({ name, email, password, role }: { name: string; email: string; password: string; role: 'patient' | 'doctor' }) => {
    setIsLoading(true);
    try {
      const raw = localStorage.getItem('users');
      const users: Array<any> = raw ? JSON.parse(raw) : [];
      const exists = users.find((u) => u.email === email);
      if (exists) {
        setIsLoading(false);
        return { ok: false, message: 'Email already registered. Please sign in.' };
      }

      const newUser = { name, email, password, role };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // if doctor, optionally register in app context via localStorage 'doctors' list (AppContext may seed from this later)
      if (role === 'doctor') {
        const rawDocs = localStorage.getItem('doctors');
        const docs = rawDocs ? JSON.parse(rawDocs) : [];
        docs.push({ value: email.split('@')[0], name, speciality: '', hospital: '' });
        localStorage.setItem('doctors', JSON.stringify(docs));
      }

      const authUser: User = { name, email, role };
      setUser(authUser);
      localStorage.setItem('authUser', JSON.stringify(authUser));
      setIsLoading(false);

      if (role === 'patient') router.push('/dashboard');
      else router.push('/admin');

      return { ok: true };
    } catch (err) {
      setIsLoading(false);
      return { ok: false, message: 'An error occurred while signing up' };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    router.push('/');
  };

  useEffect(() => {
    // try to load auth user from localStorage on mount
    const raw = localStorage.getItem('authUser');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, isAuthenticated, isLoading }}
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
