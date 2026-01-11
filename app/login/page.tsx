
'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Shield, Loader2 } from 'lucide-react';

const supabaseUrl = typeof window !== 'undefined' ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co' : 'https://placeholder.supabase.co';
const supabaseKey = typeof window !== 'undefined' ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder' : 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (supabaseUrl.includes('placeholder')) {
      setMessage('Configuration Error: Supabase URL/Key missing in environment.');
      return;
    }
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100 text-center">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-6">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to SecNaija</h1>
        <p className="text-slate-500 mb-8 text-sm">Enter your email to receive a secure login link.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="name@company.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Send Magic Link
          </button>
        </form>

        {message && (
          <p className="mt-6 text-sm font-medium text-indigo-600 bg-indigo-50 p-3 rounded-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
