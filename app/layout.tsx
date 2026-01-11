// Fix: Added Shield import to satisfy the usage on line 23 and removed unused lucide-react icons and requireAuth
import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'SecNaija | Private Security Portal',
  description: 'Smart security management for Nigerian Estates and SMEs.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-700">
              <Shield className="w-6 h-6" />
              <span>SecNaija</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/pricing" className="hover:text-indigo-600">Pricing</Link>
              <Link href="/coverage" className="hover:text-indigo-600">Coverage</Link>
              <Link href="/work-for-us" className="hover:text-indigo-600">Work for Us</Link>
              <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Login</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="mb-4 text-sm">
              &copy; {new Date().getFullYear()} SecNaija Security Solutions. All rights reserved.
            </p>
            <p className="text-xs max-w-2xl mx-auto italic">
              Disclaimer: SecNaija provides private security support and monitoring. We are not law enforcement. 
              In case of active crime, we coordinate with the Nigerian Police Force and NSCDC.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}