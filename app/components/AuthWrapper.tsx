"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AuthWrapperProps {
  children: ReactNode;
}

const publicRoutes = ['/login', '/signup'];

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the isLoggedIn cookie exists
    const cookieExists = document.cookie.split('; ').some(row => row.startsWith('isLoggedIn='));
    setIsLoggedIn(cookieExists);
  }, []);

  // Show loading state while checking auth status
  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid" />
      </div>
    ); // Loading spinner
  }

  // If not logged in and not on a public route, show unauthorized message
  if (!isLoggedIn && !publicRoutes.includes(window.location.pathname)) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
          <XMarkIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Available</h2>
          <p className="text-gray-600 mb-4">
            You are not authenticated! Please log in to access this page.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            onClick={() => {
              console.log("Redirecting to Login page");
              window.location.href = '/login'; // Redirect to login page
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AuthWrapper;
