import React from 'react';
import { FileText, Database, Shield, Zap, Info, List, Server, CreditCard, ClipboardList } from 'lucide-react';

const PlanningDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">SecNaija MVP Blueprint</h1>
        <p className="text-lg text-gray-600">Product Requirements Document (PRD) & Implementation Architecture</p>
      </section>

      <DocSection icon={<ClipboardList />} title="1. Product Requirements Document (PRD)">
        <div className="space-y-6 text-gray-700">
          <div>
            <h4 className="font-bold text-indigo-900">Objective</h4>
            <p>Launch a compliant, subscription-based security platform for the Mowe-Ibafo estate corridor, enabling rapid response and monitoring with digital accountability.</p>
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 text-sm">MVP Scope (In-Scope)</h4>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li>Multi-tenant Client Portal for Estates/SMEs.</li>
              <li>Dispatch Dashboard for internal operations.</li>
              <li>Stripe Subscription Integration + Manual Bank Transfer Approval Flow.</li>
              <li>SLA-based Incident Tracking & Reporting (PDF).</li>
              <li>Guard Attendance Management for managed sites.</li>
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h4 className="font-bold text-red-900 text-sm">Critical Safeguards</h4>
            <p className="text-sm text-red-800 italic">"SecNaija is a private security support service. We facilitate rapid response via licensed partners/patrols and coordinate with NSCDC/NPF. We do not engage in unauthorized vigilantism or weapon procurement."</p>
          </div>
        </div>
      </DocSection>

      <DocSection icon={<Database />} title="2. Database Schema (Supabase/Postgres)">
        <p className="text-sm text-gray-600 mb-4">Multi-tenant architecture with Row-Level Security (RLS) policies.</p>
        <pre className="bg-gray-900 text-indigo-300 p-6 rounded-xl overflow-x-auto text-xs leading-relaxed">
{`-- TABLE: organizations (Tenant)
-- TABLE: sites (Property under Tenant)
-- TABLE: incidents (Core Event Log)
-- TABLE: subscriptions (Billing Info)
-- TABLE: audit_logs (Strict traceability)

-- RLS POLICY EXAMPLE:
CREATE POLICY "Users see only their org's sites" 
ON sites FOR SELECT 
USING (auth.uid() IN (
  SELECT id FROM profiles WHERE org_id = sites.org_id
));`}
        </pre>
      </DocSection>

      <DocSection icon={<Server />} title="3. API & Server Actions">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3">Endpoint</th>
                <th className="p-3">Action</th>
                <th className="p-3">Security</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3 font-mono text-xs">/api/panic</td>
                <td className="p-3">Trigger emergency flow</td>
                <td className="p-3 text-red-600 font-bold">Auth Required</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">/api/billing/manual</td>
                <td className="p-3">Submit bank transfer proof</td>
                <td className="p-3">User Auth</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">/api/ops/dispatch</td>
                <td className="p-3">Assign unit to incident</td>
                <td className="p-3 text-indigo-600">Ops Role Only</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">/api/reports/monthly</td>
                <td className="p-3">Generate PDF KPI report</td>
                <td className="p-3">Org Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection icon={<CreditCard />} title="4. Payment Strategy">
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="border border-gray-100 p-4 rounded-xl bg-gray-50">
            <h4 className="font-bold mb-2">Stripe Flow</h4>
            <ul className="list-disc ml-4 text-gray-600">
              <li>Use Stripe Billing for recurring Estate/SME subs.</li>
              <li>Webhook: <code>customer.subscription.updated</code>.</li>
              <li>Handle currency conversion at checkout.</li>
            </ul>
          </div>
          <div className="border border-gray-100 p-4 rounded-xl bg-gray-50">
            <h4 className="font-bold mb-2">Manual Fallback (Nigeria)</h4>
            <ul className="list-disc ml-4 text-gray-600">
              <li>Upload bank receipt via Dashboard.</li>
              <li>Finance Admin verifies in Ops Portal.</li>
              <li>System activates sub upon approval.</li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection icon={<Zap />} title="5. Implementation Timeline">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-20 text-indigo-600 font-bold text-sm">Week 1</div>
            <div className="text-sm text-gray-700">Supabase Setup, Auth, Profile Schema, Landing Page v1.</div>
          </div>
          <div className="flex space-x-4">
            <div className="w-20 text-indigo-600 font-bold text-sm">Week 2</div>
            <div className="text-sm text-gray-700">Client Portal: Site Management & Incident Reporting.</div>
          </div>
          <div className="flex space-x-4">
            <div className="w-20 text-indigo-600 font-bold text-sm">Week 3</div>
            <div className="text-sm text-gray-700">Ops Portal: Dispatch Dashboard & Stripe Integration.</div>
          </div>
          <div className="flex space-x-4">
            <div className="w-20 text-indigo-600 font-bold text-sm">Week 4</div>
            <div className="text-sm text-gray-700">UAT in Mowe/Ibafo corridor, PDF Reporting, Public Launch.</div>
          </div>
        </div>
      </DocSection>

      <DocSection icon={<Shield />} title="6. Risk & Mitigation">
        <ul className="space-y-4 text-sm text-gray-700">
          <li className="flex items-start">
            <Info className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
            <span><strong>Regulatory:</strong> Ensure valid NSCDC PGC license is displayed and partners are vetted.</span>
          </li>
          <li className="flex items-start">
            <Info className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
            <span><strong>Abuse:</strong> Rate limit "Panic" triggers. Charge fines for excessive false alarms (stated in Terms).</span>
          </li>
          <li className="flex items-start">
            <Info className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
            <span><strong>Data Privacy:</strong> CCTV footage must be end-to-end encrypted and access logged per legal data retention policies.</span>
          </li>
        </ul>
      </DocSection>
    </div>
  );
};

const DocSection = ({ icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center space-x-4 mb-8">
      <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
        {React.cloneElement(icon, { className: 'h-6 w-6' })}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

export default PlanningDocs;