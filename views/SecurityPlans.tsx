import React, { useState } from 'react';
import { Shield, Check, Info, ArrowRight, HelpCircle, MapPin, Building2, Home, Users, Radio, Zap, Clock, FileText, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityPlansView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    propertyType: 'Home',
    plan: 'Standard',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<null | 'success'>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <div className="bg-white">
      {/* SECTION 1 — HERO */}
      <section className="bg-slate-900 text-white py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/10 skew-x-12 transform translate-x-20 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left grid lg:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Private Security Plans Built for <span className="text-indigo-400 text-shadow">Nigerian Communities</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
              Structured, lawful, and technology-enabled protection for your family, business, and estate. Professional support from Nigeria's modern security specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#quote-form" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-900/40 transition">
                Request a Security Quote
              </a>
              <Link to="/coverage" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition">
                Check Coverage
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full"></div>
              <Shield className="w-64 h-64 text-indigo-500/80 relative z-10 drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — HOW SECNAIJA SECURITY WORKS */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How SecNaija Security Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Our structured approach ensures you are never left alone during an incident.</p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          <StepCard number="01" title="Choose a Plan" desc="Select a security plan that fits your property type and risk profile." />
          <StepCard number="02" title="Verify Zone" desc="Confirm your site is within an active RapidCover response corridor." />
          <StepCard number="03" title="Assessment" desc="Our team conducts a physical or digital security audit of your site." />
          <StepCard number="04" title="Coordination" desc="Sync with our Control Room and dedicated mobile patrol units." />
          <StepCard number="05" title="Reporting" desc="Receive digital logs and incident reports for every action taken." />
        </div>
        <div className="mt-16 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-start gap-4">
          <Info className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 italic">
            <strong>Non-Emergency Disclaimer:</strong> SecNaija is a private security support service. We coordinate with the Nigerian Police Force and NSCDC for all criminal matters. In case of an active life-threatening crime, always attempt to alert public emergency services first.
          </p>
        </div>
      </section>

      {/* SECTION 3 — WHO THESE PLANS ARE FOR */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tailored Solutions for Every Need</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <AudienceCard 
              icon={<Home className="w-8 h-8 text-indigo-600" />}
              title="Homes & Families"
              desc="Protect your residence from unauthorized intrusion. Our plans offer peace of mind for families, especially during night hours and travel periods."
            />
            <AudienceCard 
              icon={<Building2 className="w-8 h-8 text-indigo-600" />}
              title="SMEs & Retail"
              desc="Safeguard your inventory, staff, and premises. Ideal for shops, pharmacies, schools, and offices requiring consistent perimeter oversight."
            />
            <AudienceCard 
              icon={<Users className="w-8 h-8 text-indigo-600" />}
              title="Estates & Communities"
              desc="Comprehensive security management for CDA and Estate committees. Unified guarding, patrol, and technology for the entire community."
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 — SECURITY PLAN OPTIONS (CORE) */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Compare Our Core Plans</h2>
          <p className="text-slate-600">Choose the level of protection that matches your requirements.</p>
        </div>
        <div className="grid lg:grid-cols-4 gap-6">
          <PlanCard 
            name="Basic Plan"
            price="₦20,000"
            billing="/mo"
            bestFor="Single apartments or low-traffic SMEs"
            includes={['Control Room Registration', 'Mobile App Access', 'Digital Incident Logging', 'Emergency SMS Alerts']}
            excludes={['Rapid Response Patrols', 'CCTV Monitoring', 'Hardware Installation']}
          />
          <PlanCard 
            name="Standard Plan"
            price="₦60,000"
            billing="/mo"
            highlight
            bestFor="Active family homes and retail shops"
            includes={['All Basic Features', 'RapidCover Patrol Access', '15-Minute Response SLA', '2 Verification Calls/Month']}
            excludes={['Active CCTV Monitoring', 'On-site Guarding']}
          />
          <PlanCard 
            name="Premium Plan"
            price="₦150,000"
            billing="/mo"
            bestFor="High-value SMEs and private villas"
            includes={['All Standard Features', 'Active CCTV Monitoring', 'Live AI Perimeter Alerts', 'Weekly KPI Reports', 'Dedicated Support Line']}
            excludes={['Full Guard Force Mgmt']}
          />
          <PlanCard 
            name="Estate Shield"
            price="Custom Quote"
            billing=""
            isProposal
            bestFor="Gated communities & large complexes"
            includes={['Full Guard Management', 'Supervisor Oversight', 'Patrol Hub Deployment', 'Unified Monitoring', 'Financial Admin Support']}
            excludes={['Individual Unit Maintenance (Optional Add-on)']}
          />
        </div>
      </section>

      {/* SECTION 5 — SIMPLE COMPARISON TABLE */}
      <section className="py-24 bg-white overflow-x-auto">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">Feature Breakdown</h2>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Feature</th>
                <th className="py-4 font-bold text-slate-900 px-4">Basic</th>
                <th className="py-4 font-bold text-slate-900 px-4">Standard</th>
                <th className="py-4 font-bold text-slate-900 px-4">Premium</th>
                <th className="py-4 font-bold text-indigo-600 px-4">Shield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <ComparisonRow label="Control Room Access" basic std prem shield />
              <ComparisonRow label="Rapid Response" basic={false} std prem shield />
              <ComparisonRow label="Response SLA (15m)" basic={false} std prem shield />
              <ComparisonRow label="CCTV Monitoring" basic={false} std={false} prem shield />
              <ComparisonRow label="Guard Supervision" basic={false} std={false} prem={false} shield />
              <ComparisonRow label="Monthly Reports" basic={false} std prem shield />
              <ComparisonRow label="Account Manager" basic={false} std={false} prem={false} shield />
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6 — OPTIONAL ADD-ONS */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enhance Your Protection</h2>
            <p className="text-slate-400">Add these modular services to any base plan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AddOnCard title="CCTV Installation" desc="Hardware procurement and setup of smart perimeter cameras with mobile view." />
            <AddOnCard title="On-Site Guards" desc="Vetted, uniformed personnel for gate management or store protection." />
            <AddOnCard title="Event Security" desc="Short-term bouncer teams and crowd control for parties or school events." />
            <AddOnCard title="Night Escort" desc="Close-of-business support or late-night gate escort to your residence." />
          </div>
        </div>
      </section>

      {/* SECTION 7 — COVERAGE & RESPONSE ZONES */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Coverage Zones Matter</h2>
            <div className="space-y-4 text-slate-600">
              <p>Our rapid response guarantee depends on physical proximity. We only guarantee SLAs in zones where our patrol teams are actively stationed.</p>
              <div className="bg-indigo-50 p-6 rounded-2xl">
                <h4 className="font-bold text-indigo-900 mb-2">Active Zones:</h4>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-600" /> Mowe-Ibafo Corridor</li>
                  <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-600" /> Arepo / Warewa</li>
                  <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-600" /> Lagos Island (Commercial)</li>
                  <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-600" /> Lekki Phase 1</li>
                </ul>
              </div>
              <p className="text-sm italic">Response times outside these active zones are subject to prevailing traffic and proximity to nearest hub.</p>
            </div>
            <div className="mt-8">
              <Link to="/coverage" className="inline-flex items-center font-bold text-indigo-600 gap-2 hover:gap-4 transition-all">
                Check Your Area on the Map <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="bg-slate-100 rounded-3xl h-[400px] flex items-center justify-center border border-slate-200">
             <div className="text-center">
               <Zap className="w-12 h-12 text-slate-400 mx-auto mb-4" />
               <p className="text-slate-500 font-medium">Interactive Map View</p>
               <p className="text-xs text-slate-400">SLA Heatmap Active</p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — PRICING & BILLING CLARITY */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Pricing & Billing</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              All plans are billed monthly in advance. We offer flexible payment options to ensure your protection never lapses.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <Check className="w-4 h-4 text-green-500" /> Automatic Card Renewal
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <Check className="w-4 h-4 text-green-500" /> Manual Bank Transfer Fallback
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <Check className="w-4 h-4 text-green-500" /> Quarterly/Annual Discounts (5-10%)
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <Check className="w-4 h-4 text-green-500" /> Dedicated Estate Monthly Invoicing
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">No Long Contracts</h4>
            <p className="text-slate-600 text-sm mb-6">
              Home and SME plans are month-to-month. Cancel anytime with 30 days notice. We believe in earning your trust through performance, not binding paperwork.
            </p>
            <button className="text-indigo-600 text-sm font-bold flex items-center gap-1">
              Read Billing Policy <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9 — WHAT SECNAIJA DOES NOT OFFER */}
      <section className="py-24 max-w-5xl mx-auto px-4">
        <div className="bg-red-50 border border-red-100 p-10 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center justify-center gap-3">
             <Shield className="w-6 h-6" /> Legal Integrity & Safeguards
          </h2>
          <p className="text-red-800 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
            SecNaija is a professional, technology-led private security support service. To ensure your safety and comply with the laws of the Federal Republic of Nigeria, we do not engage in the following:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[11px] font-bold uppercase tracking-wider text-red-900/60">
            <div className="bg-white/50 p-3 rounded-xl border border-red-100">No Vigilantism</div>
            <div className="bg-white/50 p-3 rounded-xl border border-red-100">No Unauthorized Weapons</div>
            <div className="bg-white/50 p-3 rounded-xl border border-red-100">No Mob Actions</div>
            <div className="bg-white/50 p-3 rounded-xl border border-red-100">No Substitute for NPF</div>
          </div>
          <p className="mt-8 text-xs text-red-700 italic">
            "Professional security is about de-escalation, monitoring, and structured response. We coordinate with the police to bring about lawful outcomes."
          </p>
        </div>
      </section>

      {/* SECTION 10 — REQUEST A QUOTE (PRIMARY CONVERSION) */}
      <section id="quote-form" className="py-24 max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white grid lg:grid-cols-2 gap-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32"></div>
          <div>
            <h2 className="text-4xl font-bold mb-6">Request a Security Assessment</h2>
            <p className="text-slate-400 mb-10 text-lg">
              Not sure which plan is right for you? Our specialists will review your location and property type to provide a tailored recommendation.
            </p>
            <div className="space-y-6">
              <BenefitItem icon={<Radio className="w-5 h-5 text-indigo-400" />} label="Free digital perimeter audit" />
              <BenefitItem icon={<Users className="w-5 h-5 text-indigo-400" />} label="SLA confirmation for your specific street" />
              <BenefitItem icon={<FileText className="w-5 h-5 text-indigo-400" />} label="Detailed proposal for your Board/Committee" />
            </div>
            <div className="mt-12 pt-12 border-t border-slate-800 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                 <Smartphone className="w-6 h-6 text-indigo-400" />
               </div>
               <div>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Speak to an Advisor</p>
                 <p className="text-lg font-bold">+234 800 SECNAIJA</p>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl relative z-10">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="text-slate-500">A SecNaija specialist will contact you within 24–48 hours to finalize your assessment.</p>
                <button onClick={() => setFormStatus(null)} className="mt-8 text-indigo-600 font-bold hover:underline">Send another request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Phone</label>
                    <input 
                      required 
                      type="tel" 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition" 
                      placeholder="080 1234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Location / Street Address</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition" 
                    placeholder="e.g. Arepo, Ogun State"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Property Type</label>
                    <select 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition appearance-none"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                    >
                      <option>Home</option>
                      <option>SME / Shop</option>
                      <option>Estate / CDA</option>
                      <option>Office</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Interested Plan</label>
                    <select 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition appearance-none"
                      value={formData.plan}
                      onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    >
                      <option>Basic</option>
                      <option>Standard</option>
                      <option>Premium</option>
                      <option>Estate Shield</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Additional Notes</label>
                  <textarea 
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition" 
                    placeholder="Specific security concerns..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-100 transition mt-4">
                  Request Security Assessment
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-4 italic uppercase tracking-wider">
                  Secure processing • No spam • 24h Response
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 11 — TRUST & FOOTER MICROCOPY */}
      <section className="py-12 bg-slate-900 border-t border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
             <div className="bg-slate-800 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-indigo-400" />
             </div>
             <p className="text-xs text-slate-500 max-w-sm">
                Licensed Private Guard Company support. Partners with NSCDC & NPF. Operational Excellence in the Ogun-Lagos corridor.
             </p>
           </div>
           <div className="flex gap-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition">SLA Guarantee</span>
           </div>
        </div>
      </section>
    </div>
  );
};

// HELPER COMPONENTS
function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="relative">
      <div className="text-5xl font-black text-slate-100 absolute -top-4 -left-2 z-0">{number}</div>
      <div className="relative z-10 pt-4">
        <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function AudienceCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all group">
      <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function PlanCard({ name, price, billing, bestFor, includes, excludes, highlight, isProposal }: any) {
  return (
    <div className={`flex flex-col p-8 rounded-[2.5rem] border transition-all hover:scale-[1.02] ${highlight ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200' : 'bg-white border-slate-100 text-slate-900 shadow-sm'}`}>
      <div className="mb-8">
        <h3 className={`text-xl font-extrabold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
        <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>Best for: {bestFor}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black">{price}</span>
          <span className={`text-xs ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{billing}</span>
        </div>
      </div>
      
      <div className="flex-grow space-y-6">
        <div>
          <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>What's Included</h4>
          <ul className="space-y-3">
            {includes.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-xs leading-tight">
                <Check className={`w-3 h-3 flex-shrink-0 mt-0.5 ${highlight ? 'text-indigo-300' : 'text-green-500'}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${highlight ? 'text-indigo-200/50' : 'text-slate-300'}`}>Exclusions</h4>
          <ul className="space-y-2 opacity-50">
            {excludes.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-[10px] leading-tight line-through decoration-1">
                <XCircleIcon className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <a href="#quote-form" className={`mt-10 w-full py-4 rounded-2xl font-bold text-sm text-center transition-all ${highlight ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg shadow-indigo-900/20' : 'bg-slate-900 text-white hover:bg-indigo-600'}`}>
        {isProposal ? 'Request Proposal' : 'Request Quote'}
      </a>
    </div>
  );
}

function ComparisonRow({ label, basic, std, prem, shield }: { label: string, basic: boolean, std: boolean, prem: boolean, shield: boolean }) {
  return (
    <tr>
      <td className="py-4 text-sm font-medium text-slate-700 pr-4">{label}</td>
      <td className="py-4 px-4">{basic ? <Check className="w-4 h-4 text-green-500" /> : <XCircleIcon className="w-4 h-4 text-slate-200" />}</td>
      <td className="py-4 px-4">{std ? <Check className="w-4 h-4 text-green-500" /> : <XCircleIcon className="w-4 h-4 text-slate-200" />}</td>
      <td className="py-4 px-4">{prem ? <Check className="w-4 h-4 text-green-500" /> : <XCircleIcon className="w-4 h-4 text-slate-200" />}</td>
      <td className="py-4 px-4">{shield ? <Check className="w-4 h-4 text-indigo-600" /> : <XCircleIcon className="w-4 h-4 text-slate-200" />}</td>
    </tr>
  );
}

function AddOnCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors">
      <h4 className="font-bold mb-2 text-indigo-400">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function BenefitItem({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
      <span className="text-slate-300 font-medium">{label}</span>
    </div>
  );
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default SecurityPlansView;