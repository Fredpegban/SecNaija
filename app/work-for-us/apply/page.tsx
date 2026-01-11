
'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Upload, Loader2, CheckCircle } from 'lucide-react';
import { ROLE_LABELS, RecruitmentRole } from '../../../lib/recruitment';
import { createClient } from '@supabase/supabase-js';

// Simple helper to parse query params in React Router
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const supabaseUrl = typeof window !== 'undefined' ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co' : 'https://placeholder.supabase.co';
const supabaseKey = typeof window !== 'undefined' ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder' : 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function ApplyPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const roleFromUrl = query.get('role') as RecruitmentRole;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Mowe',
    area: '',
    experience: '0',
    summary: '',
    nin: ''
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roleFromUrl) {
      navigate('/work-for-us');
    }
  }, [roleFromUrl, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (supabaseUrl.includes('placeholder')) {
      setError('Configuration Error: Supabase URL/Key missing.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const refCode = Math.random().toString(36).substring(2, 10).toUpperCase();

      // 1. Insert Applicant record
      const { data: applicant, error: appError } = await supabase
        .from('recruitment_applicants')
        .insert({
          user_id: user?.id,
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          role: roleFromUrl,
          city: form.city,
          area: form.area,
          years_experience: parseInt(form.experience),
          previous_experience_summary: form.summary,
          nin_number: form.nin,
          reference_code: refCode
        })
        .select()
        .single();

      if (appError) throw appError;

      // 2. Upload Document if present
      if (file && applicant) {
        const filePath = `${applicant.id}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('recruitment_docs')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        await supabase.from('recruitment_documents').insert({
          applicant_id: applicant.id,
          document_type: 'id_card',
          storage_path: filePath,
          file_name: file.name
        });
      }

      setSuccess(refCode);
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
        <p className="text-slate-600 mb-8">
          Thank you for applying. Our recruitment team will review your profile shortly.
        </p>
        <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 mb-8">
          <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Your Reference Code</div>
          <div className="text-3xl font-mono font-bold text-slate-900">{success}</div>
        </div>
        <button onClick={() => navigate('/')} className="text-indigo-600 font-bold">Return to Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Apply for {ROLE_LABELS[roleFromUrl] || 'Role'}</h1>
          <p className="text-sm text-slate-500">SecNaija Recruitment Department</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 space-y-6">
        {error && <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Full Name</label>
            <input 
              required
              className="w-full p-3 border rounded-xl"
              value={form.fullName}
              onChange={e => setForm({...form, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Email Address</label>
            <input 
              type="email"
              required
              className="w-full p-3 border rounded-xl"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Phone Number</label>
            <input 
              required
              className="w-full p-3 border rounded-xl"
              value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">NIN (Optional)</label>
            <input 
              className="w-full p-3 border rounded-xl"
              placeholder="11-digit NIN"
              value={form.nin}
              onChange={e => setForm({...form, nin: e.target.value})}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Current City</label>
            <select 
              className="w-full p-3 border rounded-xl"
              value={form.city}
              onChange={e => setForm({...form, city: e.target.value})}
            >
              <option>Mowe</option>
              <option>Ibafo</option>
              <option>Arepo</option>
              <option>Warewa</option>
              <option>Lagos Island</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Years of Exp.</label>
            <input 
              type="number"
              className="w-full p-3 border rounded-xl"
              value={form.experience}
              onChange={e => setForm({...form, experience: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Previous Experience Summary</label>
          <textarea 
            className="w-full p-3 border rounded-xl"
            rows={3}
            placeholder="Tell us where you've worked before..."
            value={form.summary}
            onChange={e => setForm({...form, summary: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Upload ID Card (PDF/JPG)</label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-indigo-400 transition cursor-pointer relative">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600">{file ? file.name : 'Click to select or drag and drop'}</p>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}
        </button>
      </form>

      <p className="mt-8 text-xs text-slate-400 text-center italic">
        By submitting, you agree to the SecNaija Recruitment Code of Conduct and background check protocols.
      </p>
    </div>
  );
}
