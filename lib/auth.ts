
import { createServerClient } from './supabase/server';
import { redirect } from 'next/navigation';

export async function getUser() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) redirect('/login');
  return user;
}

export async function getProfile(userId: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

export async function requireRole(roleFlag: 'is_sectech_staff' | 'is_finance_admin' | 'is_ops_admin') {
  const user = await requireAuth();
  const profile = await getProfile(user.id);
  if (!profile || !profile[roleFlag]) {
    redirect('/app?error=unauthorized');
  }
  return { user, profile };
}
