"use client";
import { AssessmentProvider } from '../context/AssessmentContext';
import { AuthProvider } from '../context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AssessmentProvider>{children}</AssessmentProvider>
    </AuthProvider>
  );
}
