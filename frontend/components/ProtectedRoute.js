'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../components/AuthService';

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = authService.isAuthenticated();

      if (!authenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    // Loading state - you can customize this
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    // Don't render children if not authenticated (redirect will happen)
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
}