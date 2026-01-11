import React, { useState } from 'react';
import { CheckCircle, Search, Shield, Zap, Video, Users, ArrowRight } from 'lucide-react';
import { PACKAGES, ZONES } from '../constants';

const LandingView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const zone = ZONES.find(z => z.name.toLowerCase().includes(search.toLowerCase()));
    if (zone) {
      setCheckResult(zone.status === 'ACTIVE' 
        ? `✅ ${zone.name} is in our Active Zone! Estimated response: ${zone.sla}.` 
        : `⏳ ${zone.name} is coming soon. Sign up for the waitlist!`);
    } else {
      setCheckResult("❌ Location not found. We currently cover the Ogun State Mowe-Ibafo axis.");
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/1600/900')] bg-cover bg-center"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Security for Nigerian Estates <br/><span className="text-indigo-400">& SMEs</span>
          </h1>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Vetted rapid response teams, 24/7 CCTV monitoring, and elite guard management. Built for the Ogun Corridor and beyond.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition">
              Start 30-Day Pilot
            </button>
            <button className="bg-white text-indigo-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Coverage Checker */}
      <section className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-center">Check Your Coverage</h2>
          <form onSubmit={handleCheck} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Enter Estate Name or Location (e.g. Mowe)"
                className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition">
              Check Now
            </button>
          </form>
          {checkResult && (
            <div className={`mt-6 p-4 rounded-lg text-center font-medium ${checkResult.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
              {checkResult}
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">SecNaija Ecosystem</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Complete security infrastructure for high-growth communities.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="text-yellow-500" />, title: 'RapidCover', desc: 'Guaranteed dispatch within our zones for panic alarms or suspicious activity.' },
            { icon: <Video className="text-blue-500" />, title: 'CCTV Watch', desc: 'Remote off-site monitoring that acts before the incident escalates.' },
            { icon: <Users className="text-indigo-500" />, title: 'Managed Guarding', desc: 'Vetted, tech-enabled guards with automated attendance and supervisor trails.' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition group">
              <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-600 mb-6">{s.desc}</p>
              <button className="flex items-center text-indigo-600 font-semibold hover:underline">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscription Packages</h2>
            <p className="text-gray-600">Tailored pricing for Nigerian estates and businesses.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-gray-200">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{pkg.description}</p>
                  <div className="text-3xl font-bold text-indigo-600 mb-6">{pkg.price}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center text-gray-700 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 bg-gray-50 mt-auto">
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingView;