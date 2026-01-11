
import Link from 'next/link';
import { Shield, Zap, Video, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1590483734724-383b9f4a5ce4?auto=format&fit=crop&q=80&w=2000" alt="Security" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Securing Nigerian Communities with <span className="text-indigo-400">Intelligence.</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Compliant, tech-first private security for Estates, SMEs, and Events. Rapid response in the Ogun corridor.
            </p>
            <div className="flex gap-4">
              <Link href="/login" className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 shadow-xl transition">
                Start Pilot
              </Link>
              <Link href="/pricing" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Zap className="w-8 h-8" />}
          title="RapidCover"
          description="Zone-based 15-minute SLA dispatch for panic alerts and intrusions in Mowe-Ibafo."
        />
        <FeatureCard 
          icon={<Video className="w-8 h-8" />}
          title="CCTV Watch"
          description="Remote monitoring and hardware health logs for perimeter security. 24/7 accountability."
        />
        <FeatureCard 
          icon={<Users className="w-8 h-8" />}
          title="Managed Guarding"
          description="Elite, tech-enabled guards for estates. Automated attendance and supervisor checks."
        />
      </section>

      {/* Corridor Note */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">The Ogun Corridor Focus</h2>
          <p className="text-indigo-700">
            Currently serving Mowe, Ibafo, Arepo, and Warewa. Expanding to Lagos Island and Lekki in Q4 2024.
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
      <div className="text-indigo-600 mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
