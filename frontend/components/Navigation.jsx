'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from './AuthService';

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on mount
    const checkAuthStatus = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      // You could potentially decode the JWT to get user info,
      // but for now we'll just show a generic name
      if (authenticated) {
        setUserName('User'); // In a real app, you'd decode the JWT to get the actual name
      }
    };

    checkAuthStatus();

    // Add event listener for storage changes (when logout happens in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    authService.removeToken();
    setIsAuthenticated(false);
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">User Management</span>
            </Link>
            <nav className="ml-10 flex space-x-8">
              {isAuthenticated && (
                <>
                  <Link
                    href="/users"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Users
                  </Link>
                  <Link
                    href="/users/create"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Add User
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <div className="flex space-x-2">
                <Link href="/login">
                  <span className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    Login
                  </span>
                </Link>
                <Link href="/signup">
                  <span className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    Sign Up
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-600 hidden sm:block">{userName}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navigation };