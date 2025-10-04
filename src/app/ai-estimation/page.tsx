"use client";

import { AIEstimationPage } from '../../components/AIEstimationPage';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { AIEstimationSkeleton } from '../../components/ui/LoadingSkeleton';

export default function Page() {
    const { user, loading, isLoggingOut } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !user && !isLoggingOut) {
        toast.error('Please login to access this page');
        router.push('/login');
      } else if (!loading && user?.role !== 'user' && user?.role === 'admin') {
        toast.error('You do not have permission to access this page');
        router.push('/admin');
      }
    }, [user, loading, isLoggingOut, router]);
  
  if (loading) {
    return <AIEstimationSkeleton />;
  }
  
  if (!user) return null;
  
  return <AIEstimationPage />;
}
