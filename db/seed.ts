
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  // SEED ZONES
  const zones = [
    { name: 'Mowe', sla_minutes: 12 },
    { name: 'Ibafo', sla_minutes: 10 },
    { name: 'Arepo', sla_minutes: 15 },
    { name: 'Warewa', sla_minutes: 15 },
  ];
  await supabase.from('zones').upsert(zones, { onConflict: 'name' });

  // SEED PACKAGES
  const packages = [
    {
      code: 'RAPID_ESTATE',
      name: 'RapidCover – Estate',
      description: 'Estate-paid monthly retainer with 15-min SLA.',
      price_ngn_display: '₦450k – ₦900k',
      billing_type: 'MONTHLY'
    },
    {
      code: 'WATCH_DISPATCH',
      name: 'Watch + Dispatch',
      description: 'CCTV Monitoring plus Rapid Response.',
      price_ngn_display: '₦600k – ₦1.5m',
      billing_type: 'MONTHLY'
    },
    {
      code: 'SME_COVER',
      name: 'SME RapidCover',
      description: 'For small business premises.',
      price_ngn_display: '₦20k – ₦60k',
      billing_type: 'MONTHLY'
    }
  ];
  await supabase.from('packages').upsert(packages, { onConflict: 'code' });

  console.log('Seeding complete.');
}

seed();
