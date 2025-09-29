"use client";

import AdminPage from '@/components/AdminPage';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminPageRoute() {
    const { user, loading } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !user) {
        toast.error('Please login to access this page');
        router.push('/login');
      } else if (!loading && user?.role !== 'admin' && user?.role === 'user') {
        toast.error('You do not have permission to access this page');
        router.push('/input');
      }
    }, [user, loading, router]);
  return <AdminPage />;
}