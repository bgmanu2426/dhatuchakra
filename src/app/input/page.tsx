"use client";

import { InputPage } from '../../components/InputPage';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error('Please login to access this page');
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div>;
  }
  
  if (!user) return null;
  
  return <InputPage />;
}
