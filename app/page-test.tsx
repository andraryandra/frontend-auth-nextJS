// app/page.tsx

"use client"; // Menandai ini sebagai Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = document.cookie.split('; ').find(row => row.startsWith('isLoggedIn='));

    // Redirect ke dashboard jika sudah login
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  ); // Menampilkan pesan saat melakukan redirect
}
