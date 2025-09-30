"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type User = { userId: string; name: string; email: string; role: 'user' | 'admin' } | null;

interface AuthContextValue {
  user: User;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await refresh();
      toast.success('Logged out successfully');
      // Redirect to login page after logout
      window.location.href = '/login';
    } catch (error) {
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
