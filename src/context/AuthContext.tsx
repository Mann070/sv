
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
  hasCompletedProfile?: boolean;
  accountId?: string;
  memberId?: string;
  licenseNumber?: string;
  hospital?: string;
  speciality?: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string, role: 'patient' | 'doctor' | 'admin') => { ok: boolean; message?: string };
  signUp: (user: { name: string; email: string; password: string; role: 'patient' | 'doctor'; extraData?: any }) => { ok: boolean; message?: string };
  signOut: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  markProfileCompleted: () => void;
  getPendingDoctors: () => User[];
  verifyDoctor: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A default user so the app doesn't break.
const defaultUser: User = { name: 'Aravind', email: 'aravind@example.com', role: 'patient', hasCompletedProfile: true };

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

      const found = users.find((u) => u.email === email && u.role === role);
      if (!found) {
        setIsLoading(false);
        const checkEmail = users.find((u) => u.email === email);
        if (checkEmail) {
          return { ok: false, message: `This email is registered as a ${checkEmail.role}. Please use the correct role.` };
        }
        return { ok: false, message: 'Email not registered. Please sign up first.' };
      }

      if (found.password !== password) {
        setIsLoading(false);
        return { ok: false, message: 'Invalid password.' };
      }

      let hasCompletedProfile = false;
      let accountId: string | undefined = found.accountId;
      let memberId: string | undefined = found.memberId;

      if (found.role === 'patient') {
        // Ensure patient has an accountId and primary memberId
        if (!accountId) {
          const nextAccountIdRaw = localStorage.getItem('nextAccountId');
          const nextAccountId = nextAccountIdRaw ? parseInt(nextAccountIdRaw, 10) || 101 : 101;
          accountId = String(nextAccountId);
          memberId = '001';
          found.accountId = accountId;
          found.memberId = memberId;
          localStorage.setItem('nextAccountId', String(nextAccountId + 1));
          // Persist back to users list
          localStorage.setItem('users', JSON.stringify(users));
        }

        try {
          const profileRaw = localStorage.getItem(`patientProfile:${found.email}`);
          if (profileRaw) {
            const profile = JSON.parse(profileRaw);
            hasCompletedProfile = !!profile.completed;
          }
        } catch {
          // ignore JSON errors
        }
      } else if (found.role === 'doctor') {
        try {
          const profileRaw = localStorage.getItem(`doctorProfile:${found.email}`);
          if (profileRaw) {
             hasCompletedProfile = true;
          }
        } catch {
          // ignore
        }
      }

      const authUser: User = {
        name: found.name,
        email: found.email,
        role: found.role,
        hasCompletedProfile,
        accountId,
        memberId,
      };
      setUser(authUser);
      localStorage.setItem('authUser', JSON.stringify(authUser));
      setIsLoading(false);

      // redirect based on role
      if (found.role === 'patient') {
        if (hasCompletedProfile) {
          router.push('/dashboard');
        } else {
          router.push('/profile');
        }
      } else if (found.role === 'doctor') {
        if (hasCompletedProfile) {
           router.push('/doctor/dashboard');
        } else {
           router.push('/doctor/profile');
        }
      } else {
        router.push('/admin');
      }

      return { ok: true };
    } catch (err) {
      setIsLoading(false);
      return { ok: false, message: 'An error occurred' };
    }
  };

  const signUp = ({ name, email, password, role, extraData }: { name: string; email: string; password: string; role: 'patient' | 'doctor'; extraData?: any }) => {
    setIsLoading(true);
    try {
      const raw = localStorage.getItem('users');
      const users: Array<any> = raw ? JSON.parse(raw) : [];
      const exists = users.find((u) => u.email === email);
      if (exists) {
        setIsLoading(false);
        return { ok: false, message: 'Email already registered. Please sign in.' };
      }

      let accountId: string | undefined;
      let memberId: string | undefined;

      if (role === 'patient') {
        const nextAccountIdRaw = localStorage.getItem('nextAccountId');
        const nextAccountId = nextAccountIdRaw ? parseInt(nextAccountIdRaw, 10) || 101 : 101;
        accountId = String(nextAccountId);
        memberId = '001';
        localStorage.setItem('nextAccountId', String(nextAccountId + 1));
      }

      const newUser = { name, email, password, role, accountId, memberId, ...extraData };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // if doctor, optionally register in app context via localStorage 'doctors' list (AppContext may seed from this later)
      if (role === 'doctor') {
        const rawDocs = localStorage.getItem('doctors');
        const docs = rawDocs ? JSON.parse(rawDocs) : [];
        docs.push({
          value: email.split('@')[0],
          name,
          speciality: extraData?.department || '',
          hospital: extraData?.hospital || '',
          ...extraData
        });
        localStorage.setItem('doctors', JSON.stringify(docs));
      }

      const authUser: User = {
        name,
        email,
        role,
        hasCompletedProfile: false,
        accountId,
        memberId,
      };
      setUser(authUser);
      localStorage.setItem('authUser', JSON.stringify(authUser));
      setIsLoading(false);

      if (role === 'patient') router.push('/profile');
      else if (role === 'doctor') router.push('/doctor/profile');
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
        let hydratedUser = parsed;

        if (parsed.role === 'patient') {
          try {
            const profileRaw = localStorage.getItem(`patientProfile:${parsed.email}`);
            if (profileRaw) {
              const profile = JSON.parse(profileRaw);
              hydratedUser = { ...parsed, hasCompletedProfile: !!profile.completed };
            }
          } catch {
            // ignore JSON errors
          }
        } else if (parsed.role === 'doctor') {
             try {
            const profileRaw = localStorage.getItem(`doctorProfile:${parsed.email}`);
            if (profileRaw) {
              hydratedUser = { ...parsed, hasCompletedProfile: true };
            } else {
               hydratedUser = { ...parsed, hasCompletedProfile: false };
            }
          } catch {
            // ignore
          }
        }

        setUser(hydratedUser);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const isAuthenticated = !!user;

  const markProfileCompleted = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser: User = { ...prev, hasCompletedProfile: true };
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const getPendingDoctors = (): User[] => {
    // Placeholder implementation
    return [];
  };

  const verifyDoctor = (email: string) => {
    // Placeholder implementation
    console.log(`Verifying doctor: ${email}`);
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, isAuthenticated, isLoading, markProfileCompleted, getPendingDoctors, verifyDoctor }}
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
