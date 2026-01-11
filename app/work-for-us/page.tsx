
import React from 'react';
import Link from 'next/link';
import { Shield, Users, Video, MapPin, Award, ArrowRight, Info } from 'lucide-react';
import { ROLE_LABELS } from '@/lib/recruitment';

export default function WorkForUsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Build a Safer Nigeria with SecNaija</h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join the most technologically advanced private security team in the Ogun Corridor. 
            We value discipline, integrity, and local knowledge.
          </p>
          <a href="#roles" className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition">
            View Open Roles
          </a>
        </div>
      </section>

      {/* Roles Grid */}
      <section id="roles" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Choose Your Path</h2>
          <p className="text-slate-600 mt-2">Vetted opportunities for professionals and service veterans.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RoleCard 
            id="guard" 
            title={ROLE_LABELS.guard} 
            icon={<Shield />} 
            desc="Elite estate guarding. Tech-enabled with automated attendance."
          />
          <RoleCard 
            id="bouncer" 
            title={ROLE_LABELS.bouncer} 
            icon={<Users />} 
            desc="Professional crowd control for events and private escorts."
          />
          <RoleCard 
            id="cctv_tech" 
            title={ROLE_LABELS.cctv_tech} 
            icon={<Video />} 
            desc="Hardware installation and network maintenance specialists."
          />
          <RoleCard 
            id="community_partner" 
            title={ROLE_LABELS.community_partner} 
            icon={<MapPin />} 
            desc="Local surveillance partners and field intelligence contacts."
          />
          <RoleCard 
            id="retired_service" 
            title={ROLE_LABELS.retired_service} 
            icon={<Award />} 
            desc="Supervisory roles for retired NPF/Military personnel."
            highlight
          />
        </div>
      </section>

      {/* Safety & Compliance Disclaimer */}
      <section className="bg-white border-y border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6" /> Our Commitment to Professionalism
            </h3>
            <div className="space-y-4 text-indigo-800 text-sm leading-relaxed">
              <p>SecNaija is a private security support platform, not a law enforcement agency. We operate strictly within the laws of Nigeria and under NSCDC regulations.</p>
              <p><strong>Strict Policy:</strong> We do not support vigilantism, the use of illegal force, or unauthorized weapons. All serious criminal incidents are immediately escalated to the Nigerian Police Force (NPF).</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold mb-10 text-center">Recruitment Process</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Step num="01" label="Online Application" />
          <Step num="02" label="Documentation Audit" />
          <Step num="03" label="Vetting & Interview" />
          <Step num="04" label="Deployment" />
        </div>
      </section>
    </div>
  );
}

function RoleCard({ id, title, icon, desc, highlight }: any) {
  return (
    <div className={`p-8 rounded-3xl border transition group hover:shadow-xl ${highlight ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
      <div className={`mb-6 w-12 h-12 flex items-center justify-center rounded-xl ${highlight ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className={`mb-8 text-sm leading-relaxed ${highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{desc}</p>
      <Link href={`/work-for-us/apply?role=${id}`} className={`inline-flex items-center font-bold gap-2 group-hover:gap-4 transition-all ${highlight ? 'text-white' : 'text-indigo-600'}`}>
        Apply Now <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function Step({ num, label }: any) {
  return (
    <div className="text-center p-6 bg-white rounded-2xl border border-slate-100">
      <div className="text-indigo-600 font-extrabold text-2xl mb-2">{num}</div>
      <div className="text-sm font-medium text-slate-600">{label}</div>
    </div>
  );
}
