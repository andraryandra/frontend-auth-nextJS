// app/components/LoginForm.tsx

"use client"; // Menandai ini sebagai Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { loginUser } from "../services/auth.service";
// import Image from "next/image";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Sending login request with:", { username, password });
      const data = await loginUser(username, password); // Panggil fungsi login dari service

      console.log("Response received:", data);

      if (data.accessToken) {
        localStorage.setItem("isLoggedIn", "true"); // Simpan status login
        localStorage.setItem("accessToken", data.accessToken); // Simpan access token
        router.push("/dashboard"); // Arahkan ke dashboard setelah login
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Tangani kesalahan
        console.error("Login error:", err);
      } else {
        setError("An unknown error occurred.");
        console.error("Unknown error:", err);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm">
      {/* <Image
        src="/images/logo.png"
        alt="Description"
        width={70}
        height={50}
      /> */}
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm my-2 font-medium">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm my-2 font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="rememberMe" className="text-sm">
          Ingat Saya
        </label>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Login
      </button>
      <p className="mt-4 text-sm text-center">
        <a href="/forgot-password" className="text-blue-600 hover:underline">
          Lupa Password?
        </a>
      </p>
      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
