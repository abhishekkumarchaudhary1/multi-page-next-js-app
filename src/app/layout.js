// app/layout.js

'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get current route

  // Function to check if the link is active
  const isActive = (path) => pathname === path;

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Fixed Header with Navigation */}
          <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 text-white flex items-center justify-center shadow-md z-10">
            <nav className="flex space-x-4">
              <Link href="/" className={`p-2 ${isActive('/') ? 'bg-white text-black' : ''}`}>Home</Link>
              <Link href="/about" className={`p-2 ${isActive('/about') ? 'bg-white text-black' : ''}`}>About</Link>
              <Link href="/contact" className={`p-2 ${isActive('/contact') ? 'bg-white text-black' : ''}`}>Contact</Link>
              {/* Add more links as needed */}
            </nav>
          </header>

          {/* Main Content (Outlet) */}
          <main className="flex-grow pt-16 pb-16">
            <div className="container mx-auto px-4">
              {children}
            </div>
          </main>

          {/* Fixed Footer */}
          <footer className="fixed bottom-0 left-0 right-0 h-16 bg-gray-800 text-white flex items-center justify-center shadow-md">
            <p className="text-sm">&copy; 2024 Website by Abhishek. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
