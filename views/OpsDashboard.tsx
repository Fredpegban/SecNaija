
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Radio, Users, Map, Settings, Search, Bell } from 'lucide-react';

const OpsDashboard: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-900 text-gray-100">
      <OpsSidebar />
      <div className="flex-grow overflow-y-auto p-8 bg-gray-950">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dispatch Control Room</h1>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
            </div>
            <div className="flex items-center space-x-3 bg-gray-800 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium">Ops Active: Mowe Corridor</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Incoming Incidents Queue */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
              <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
                <h2 className="font-bold flex items-center">
                  <Radio className="h-5 w-5 mr-2 text-red-500" /> Live Incident Queue
                </h2>
                <span className="text-xs text-gray-500">2 Alerts active</span>
              </div>
              <div className="divide-y divide-gray-800">
                <IncidentItem 
                  title="Panic Alarm: Gate 1" 
                  site="Palm Estates" 
                  time="2 mins ago" 
                  priority="CRITICAL"
                  status="VERIFYING"
                />
                <IncidentItem 
                  title="Motion Detection: Rear Fence" 
                  site="SME Hub Mowe" 
                  time="14 mins ago" 
                  priority="MEDIUM"
                  status="DISPATCHED"
                />
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 h-96 flex flex-col items-center justify-center text-center">
              <Map className="h-16 w-16 text-gray-700 mb-4" />
              <p className="text-gray-500">Satellite Dispatch Map</p>
              <p className="text-xs text-gray-600 mt-2">Active Patrol Teams: 4 Units</p>
            </div>
          </div>

          {/* Right Panel: Patrol Status */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="font-bold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-indigo-500" /> Patrol Teams
              </h2>
              <div className="space-y-4">
                <PatrolTeamItem name="Alpha 1" status="ON_SITE" zone="Mowe North" />
                <PatrolTeamItem name="Alpha 2" status="AVAILABLE" zone="Ibafo" />
                <PatrolTeamItem name="Bravo 1" status="RESPONDING" zone="Arepo" />
                <PatrolTeamItem name="Sierra 1" status="OFFLINE" zone="Hub" />
              </div>
            </div>

            <div className="bg-indigo-900/30 border border-indigo-500/30 p-6 rounded-2xl">
              <h3 className="font-bold text-indigo-400 mb-2">SLA Health</h3>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-white">10.4m</span>
                <span className="text-xs text-indigo-300 mb-1">avg today</span>
              </div>
              <div className="mt-4 w-full bg-indigo-900/50 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OpsSidebar = () => (
  <div className="w-20 lg:w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-all">
    <div className="p-6 text-center lg:text-left">
      <span className="text-indigo-500 font-bold hidden lg:inline">SEC-OPS PANEL</span>
    </div>
    <nav className="flex-grow px-4 space-y-4">
      <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
      <SidebarItem icon={<Radio />} label="Dispatch" />
      <SidebarItem icon={<Users />} label="Guards" />
      <SidebarItem icon={<Map />} label="Coverage" />
      <SidebarItem icon={<Settings />} label="Settings" />
    </nav>
  </div>
);

const SidebarItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition ${active ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
    {React.cloneElement(icon, { className: 'h-6 w-6' })}
    <span className="hidden lg:inline font-medium text-sm">{label}</span>
  </div>
);

const IncidentItem = ({ title, site, time, priority, status }: any) => (
  <div className="p-6 flex items-center justify-between hover:bg-gray-800/50 transition cursor-pointer">
    <div className="flex items-center space-x-4">
      <div className={`w-2 h-2 rounded-full ${priority === 'CRITICAL' ? 'bg-red-500 animate-ping' : 'bg-yellow-500'}`}></div>
      <div>
        <h4 className="font-bold text-sm text-white">{title}</h4>
        <p className="text-xs text-gray-500">{site} • {time}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-[10px] font-bold bg-gray-800 px-2 py-1 rounded text-gray-400">{status}</span>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs font-bold transition">Assign</button>
    </div>
  </div>
);

const PatrolTeamItem = ({ name, status, zone }: any) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-bold">{name}</p>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{zone}</p>
    </div>
    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
      status === 'AVAILABLE' ? 'text-green-400 bg-green-400/10' :
      status === 'RESPONDING' ? 'text-blue-400 bg-blue-400/10' :
      status === 'ON_SITE' ? 'text-yellow-400 bg-yellow-400/10' :
      'text-gray-500 bg-gray-500/10'
    }`}>
      {status}
    </span>
  </div>
);

export default OpsDashboard;
