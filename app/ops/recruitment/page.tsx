
'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ROLE_LABELS, STATUS_COLORS, RecruitmentRole, RecruitmentStatus } from '../../../lib/recruitment';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const supabaseUrl = typeof window !== 'undefined' ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co' : 'https://placeholder.supabase.co';
const supabaseKey = typeof window !== 'undefined' ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder' : 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function OpsRecruitmentDashboard() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', role: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (supabaseUrl.includes('placeholder')) {
      setError('Supabase environment variables are missing.');
      setLoading(false);
      return;
    }

    async function load() {
      try {
        let query = supabase
          .from('recruitment_applicants')
          .select('*')
          .order('created_at', { ascending: false });

        if (filter.status) query = query.eq('status', filter.status);
        if (filter.role) query = query.eq('role', filter.role);

        const { data, error: fetchError } = await query;
        if (fetchError) throw fetchError;
        setApplicants(data || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load applicants.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filter]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recruitment Pipeline</h1>
          <p className="text-slate-500">Manage applicants and vetting status.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex-grow flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input className="bg-transparent border-none outline-none text-sm w-full" placeholder="Search by name or code..." />
        </div>
        <select 
          className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none cursor-pointer"
          value={filter.role}
          onChange={e => setFilter({...filter, role: e.target.value})}
        >
          <option value="">All Roles</option>
          {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select 
          className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none cursor-pointer"
          value={filter.status}
          onChange={e => setFilter({...filter, status: e.target.value})}
        >
          <option value="">All Statuses</option>
          {Object.entries(STATUS_COLORS).map(([k, v]) => <option key={k} value={k}>{k.replace('_', ' ')}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b">
                <th className="p-4">Applicant</th>
                <th className="p-4">Role</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {applicants.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 text-sm">
                    <div className="font-bold text-slate-900">{app.full_name}</div>
                    <div className="text-xs text-slate-400 font-mono">{app.reference_code}</div>
                  </td>
                  <td className="p-4 text-sm font-medium">{ROLE_LABELS[app.role as RecruitmentRole]}</td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-slate-700">{app.city}</div>
                    <div className="text-xs text-slate-400">{app.area || 'Main'}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${STATUS_COLORS[app.status as RecruitmentStatus]}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      to={`/ops/recruitment/${app.id}`}
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold text-sm"
                    >
                      Review <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-20 text-center text-slate-400">Loading pipeline...</div>}
          {!loading && !error && applicants.length === 0 && <div className="p-20 text-center text-slate-400">No applicants found.</div>}
        </div>
      </div>
    </div>
  );
}
