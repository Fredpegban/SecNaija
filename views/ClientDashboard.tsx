
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, Video, MapPin, CreditCard, Users, Clock, CheckCircle2 } from 'lucide-react';
import { Incident } from '../types';

const MOCK_INCIDENTS: Incident[] = [
  { id: '1', siteName: 'Palm Estates', type: 'Panic Alarm', status: 'RESOLVED', timestamp: '2024-05-10 14:20', priority: 'HIGH' },
  { id: '2', siteName: 'Palm Estates', type: 'Intrusion Alert', status: 'DISPATCHED', timestamp: '2024-05-12 02:15', priority: 'HIGH' },
];

const ClientDashboard: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      <ClientSidebar />
      <div className="flex-grow overflow-y-auto p-8">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="incidents" element={<IncidentsView />} />
          <Route path="sites" element={<SitesView />} />
        </Routes>
      </div>
    </div>
  );
};

const ClientSidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Overview', path: '/client' },
    { icon: <ShieldAlert />, label: 'Incidents', path: '/client/incidents' },
    { icon: <Video />, label: 'CCTV Monitoring', path: '/client/cctv' },
    { icon: <MapPin />, label: 'My Sites', path: '/client/sites' },
    { icon: <CreditCard />, label: 'Billing', path: '/client/billing' },
    { icon: <Users />, label: 'Team', path: '/client/team' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-6">
        <div className="bg-indigo-50 rounded-xl p-4">
          <h3 className="text-sm font-bold text-indigo-900">Palm Estates</h3>
          <p className="text-xs text-indigo-600 mt-1">Estate Shield: Active</p>
        </div>
      </div>
      <nav className="flex-grow px-4 space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              location.pathname === item.path ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-100'
            }`}
          >
            {/* Added <any> to React.ReactElement cast to allow passing className in cloneElement */}
            {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'h-5 w-5' })}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const DashboardHome = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
        <p className="text-gray-500">Here is what is happening at Palm Estates.</p>
      </div>
      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center space-x-2 animate-pulse">
        <ShieldAlert className="h-5 w-5" />
        <span>ACTIVATE PANIC</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Active Incidents" value="1" icon={<ShieldAlert className="text-red-600" />} />
      <StatCard title="Avg Response" value="11m 45s" icon={<Clock className="text-blue-600" />} />
      <StatCard title="Guard Attendance" value="98%" icon={<CheckCircle2 className="text-green-600" />} />
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-bold text-gray-900">Recent Activity</h2>
        <button className="text-indigo-600 text-sm font-medium">View All</button>
      </div>
      <div className="divide-y divide-gray-100">
        {MOCK_INCIDENTS.map((inc) => (
          <div key={inc.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${inc.status === 'RESOLVED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {inc.status === 'RESOLVED' ? <CheckCircle2 className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{inc.type}</p>
                <p className="text-xs text-gray-500">{inc.timestamp}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${inc.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {inc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div className="bg-gray-50 p-2 rounded-lg">{icon}</div>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const IncidentsView = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Incident History</h1>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
      <ShieldAlert className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">Incident data visualization would go here.</p>
    </div>
  </div>
);

const SitesView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">My Sites</h1>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">Add New Site</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-lg mb-2">Palm Estates Main Gate</h3>
        <p className="text-gray-500 text-sm mb-4">Mowe-Ibafo Corridor, Ogun State</p>
        <div className="flex space-x-4">
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Active Subscription</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Zone 1 Coverage</span>
        </div>
      </div>
    </div>
  </div>
);

export default ClientDashboard;
