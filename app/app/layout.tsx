
// Fix: Added React import to satisfy module scope requirements for React.cloneElement and React.ReactNode
import React from 'react';
import { requireAuth } from '@/lib/auth';
import Link from 'next/link';
import { LayoutDashboard, ShieldAlert, Video, MapPin, CreditCard, Settings } from 'lucide-react';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col sticky top-16 h-[calc(100vh-64px)]">
        <div className="p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Management</h2>
          <nav className="space-y-1">
            <SidebarLink href="/app" icon={<LayoutDashboard />} label="Overview" />
            <SidebarLink href="/app/incidents" icon={<ShieldAlert />} label="Incidents" />
            <SidebarLink href="/app/sites" icon={<MapPin />} label="Sites" />
            <SidebarLink href="/app/billing" icon={<CreditCard />} label="Billing" />
            <SidebarLink href="/app/org" icon={<Settings />} label="Org Settings" />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition font-medium text-sm">
      {/* Fix: Explicitly use React.cloneElement after importing React */}
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      <span>{label}</span>
    </Link>
  );
}
