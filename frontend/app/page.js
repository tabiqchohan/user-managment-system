// app/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../components/AuthService';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on mount and redirect accordingly
    const checkAuthAndRedirect = () => {
      const isAuthenticated = authService.isAuthenticated();

      if (isAuthenticated) {
        // Redirect to users page if authenticated
        router.push('/users');
      } else {
        // Redirect to login page if not authenticated
        router.push('/login');
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  // Show loading state while determining redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}