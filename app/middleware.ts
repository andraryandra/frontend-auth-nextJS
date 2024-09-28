// app/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fungsi Middleware
export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn');

  // Jika tidak ada cookie isLoggedIn, arahkan ke halaman login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah login, biarkan akses ke halaman yang diminta
  return NextResponse.next();
}

// Tentukan rute yang akan diterapkan middleware
export const config = {
  matcher: ['/dashboard/:path*'], // Terapkan middleware ke semua rute dashboard
};
