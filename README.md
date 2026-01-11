# SecNaija MVP - Next.js + Supabase + Stripe

Compliant private security platform for estates/SMEs in Nigeria.

## Setup Steps
1. **Supabase**: 
   - Create a project.
   - Run the SQL in `db/migrations/001_init.sql` in the SQL Editor.
   - Enable Email Magic Link Auth.
2. **Stripe**:
   - Set up standard checkout.
   - Create products/prices for the packages defined in `db/seed.ts`.
   - Setup a Webhook endpoint pointing to `/api/stripe/webhook`.
3. **Environment Variables**:
   - Copy `.env.example` to `.env.local` and fill in secrets.
4. **Deploy**:
   - Recommended platform: Vercel.

## Security Disclaimer
This application is designed for private security support. It is NOT a law enforcement tool. Always coordinate with NPF and NSCDC for criminal matters.