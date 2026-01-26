import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">User Management</span>
            </Link>
            <nav className="ml-10 flex space-x-8">
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
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">UM</span>
              </div>
              <span className="text-sm text-gray-600 hidden sm:block">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navigation };