"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { FormLoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { refresh } = useAuth();
  const router = useRouter();

  const fillCredentials = (type: 'user' | 'admin') => {
    if (loading) return;
    if (type === 'user') {
      setEmail('test@example.com');
      setPassword('test123');
    } else {
      setEmail('admin@example.com');
      setPassword('admin123');
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Login failed');
      
      // Determine destination BEFORE refresh
      const role = typeof data?.user?.role === 'string' ? data.user.role.toLowerCase() : '';
      const destination = role === 'admin' ? '/admin' : '/input';
      
      toast.success(`Welcome back, ${data.user.name}!`);
      
      // Refresh auth context but don't await it
      refresh();
      
      // Small delay to ensure cookie/token is set
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Use replace instead of push to prevent back button issues
      router.replace(destination);
      
      // Fallback: if router.replace fails, use hard navigation
      setTimeout(() => {
        if (window.location.pathname === '/login') {
          window.location.href = destination;
        }
      }, 500);
      
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      toast.error(msg);
      setLoading(false); // Only reset loading on error
    }
    // Don't reset loading on success - let the navigation happen
  };

  if (loading) {
    return <FormLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600 mb-6">Access your Dhatuchakra account</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50">
              Login
            </button>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => fillCredentials('user')}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50"
              >
                User
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('admin')}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-emerald-700 text-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors disabled:opacity-50"
              >
                Admin
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-gray-600">Don&apos;t have an account? <Link href="/signup" className="text-green-700 hover:text-green-800 font-medium">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
