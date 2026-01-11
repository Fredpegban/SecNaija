import React, { lazy, Suspense } from 'react';
import { MapPin, Shield, Zap, Info } from 'lucide-react';

// Use standard React lazy instead of next/dynamic for SPA compatibility
const CoverageMap = lazy(() => import('../../components/CoverageMap'));

export default function CoveragePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Operational Coverage</h1>
          <p className="text-lg text-slate-600">
            SecNaija operates in high-density corridors with strict SLA guarantees. 
            Check our active patrol zones and upcoming expansions in the Ogun-Lagos corridor.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-slate-700">Active Zone</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-slate-700">Upcoming (Q4 2024)</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-2 h-[600px] relative">
          <Suspense fallback={<div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 font-medium">Loading Interactive Map...</div>}>
            <CoverageMap />
          </Suspense>
          <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 hidden md:block max-w-xs">
            <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" /> SLA Guarantee
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              In all green zones, we guarantee a RapidCover dispatch response within 15 minutes of verification.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Mowe-Ibafo Corridor</h3>
            <div className="space-y-4">
              <ZoneListItem name="Mowe" status="ACTIVE" sla="12 min" />
              <ZoneListItem name="Ibafo" status="ACTIVE" sla="10 min" />
              <ZoneListItem name="Arepo" status="ACTIVE" sla="15 min" />
              <ZoneListItem name="Warewa" status="ACTIVE" sla="15 min" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Expansion Roadmap</h3>
            <div className="space-y-4 opacity-75">
              <ZoneListItem name="Lagos Island" status="UPCOMING" sla="Q4 2024" />
              <ZoneListItem name="Lekki Phase 1" status="UPCOMING" sla="Q1 2025" />
              <ZoneListItem name="Magodo" status="UPCOMING" sla="Q1 2025" />
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <Zap className="w-8 h-8 mb-4 opacity-80" />
            <h4 className="font-bold text-lg mb-2">Outside our zone?</h4>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              We can still support you with CCTV Watch and managed guarding systems globally. 
              Rapid response is restricted to specific zones for reliability.
            </p>
            <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition">
              Request Expansion
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center border border-slate-200">
        <div className="p-4 bg-white rounded-2xl">
          <Info className="w-8 h-8 text-slate-400" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-1">How we calculate SLA</h4>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            SLA (Service Level Agreement) represents the time between incident verification by our control room and the arrival of the first patrol unit on-site. 
            Traffic conditions are factored in, and our units are strategically positioned at corridor hubs to beat the 'Long Bridge' congestion.
          </p>
        </div>
      </div>
    </div>
  );
}

function ZoneListItem({ name, status, sla }: { name: string, status: 'ACTIVE' | 'UPCOMING', sla: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-3">
        <MapPin className={`w-4 h-4 ${status === 'ACTIVE' ? 'text-green-500' : 'text-amber-500'}`} />
        <span className="font-medium text-slate-800">{name}</span>
      </div>
      <div className="text-right">
        <div className={`text-[10px] font-bold uppercase tracking-widest ${status === 'ACTIVE' ? 'text-green-600' : 'text-amber-600'}`}>
          {status}
        </div>
        <div className="text-xs font-bold text-slate-400">{sla}</div>
      </div>
    </div>
  );
}