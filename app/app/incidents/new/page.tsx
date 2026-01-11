
'use client';

import { useState } from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export default function NewIncidentPage() {
  const [type, setType] = useState('Panic');
  const [severity, setSeverity] = useState('HIGH');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Implementation: Call Server Action to create incident and log audit
    alert('Incident Triggered. Control room notified.');
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Raise Alert</h1>
        <p className="text-slate-500">Trigger immediate response from the SecTech control room.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="bg-red-50 p-4 rounded-xl flex gap-3 text-red-800 border border-red-100">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm italic">Abuse of the panic system results in service fines as per your SLA.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Incident Type</label>
            <select 
              className="w-full p-3 border rounded-xl"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option>Panic / Emergency</option>
              <option>Suspicious Activity</option>
              <option>Intrusion / Theft</option>
              <option>Fire Alert</option>
              <option>Medical Support</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Severity</label>
            <div className="grid grid-cols-2 gap-4">
              {['MEDIUM', 'HIGH', 'CRITICAL'].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeverity(s)}
                  className={`p-3 rounded-xl border font-bold text-sm ${severity === s ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea 
              rows={4}
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Armed intrusion at back fence gate..."
            ></textarea>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 shadow-xl shadow-red-100 transition animate-pulse"
        >
          {loading ? 'SENDING...' : 'TRIGGER ALERT'}
        </button>
      </form>
    </div>
  );
}
