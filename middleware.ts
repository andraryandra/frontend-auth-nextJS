// app/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fungsi Middleware
export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn');

  // Jika pengguna mengunjungi root (/) atau halaman login (/login)
  if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login') {
    if (isLoggedIn) {
      // Jika sudah login, arahkan ke dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      // Jika belum login dan mengunjungi root (/), arahkan ke login
      if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  // Jika pengguna belum login dan mencoba mengunjungi halaman selain /login
  if (!isLoggedIn && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah login, biarkan akses ke halaman yang diminta
  return NextResponse.next();
}

// Tentukan rute yang akan diterapkan middleware
export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'], // Terapkan middleware ke root, login, dan semua rute dashboard
};