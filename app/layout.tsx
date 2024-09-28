// app/layout.tsx

import React from 'react';
import './globals.css'; // Pastikan untuk mengimpor CSS global Anda
import AuthWrapper from './components/AuthWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
