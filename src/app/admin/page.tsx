"use client";

import AdminPage from '@/components/AdminPage';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { AdminDashboardSkeleton } from '../../components/ui/LoadingSkeleton';

export default function AdminPageRoute() {
    const { user, loading, isLoggingOut } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !user && !isLoggingOut) {
        toast.error('Please login to access this page');
        router.push('/login');
      } else if (!loading && user?.role !== 'admin' && user?.role === 'user') {
        toast.error('You do not have permission to access this page');
        router.push('/input');
      }
    }, [user, loading, isLoggingOut, router]);
  
  if (loading) {
    return <AdminDashboardSkeleton />;
  }
  
  return <AdminPage />;
}