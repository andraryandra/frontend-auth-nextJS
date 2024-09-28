// app/login/page.tsx

"use client"; // Menandai ini sebagai Client Component

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Redirect ke dashboard jika sudah login
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br">
      {/* Left Side Background */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background-login.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="text-white text-4xl font-bold">Welcome Back!</h1>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-1 bg-gray-300 h-full"></div>

      {/* Right Side for Login */}
      <div className="flex-[0.6] flex items-center justify-center p-6 bg-white shadow-lg rounded-lg">
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
