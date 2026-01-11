
import { createServiceRoleClient } from './supabase/server';

export async function logAudit({
  actorId,
  orgId,
  action,
  targetTable,
  targetId,
  before,
  after
}: {
  actorId: string;
  orgId?: string;
  action: string;
  targetTable: string;
  targetId: string;
  before?: any;
  after?: any;
}) {
  const supabase = createServiceRoleClient();
  await supabase.from('audit_logs').insert({
    actor_id: actorId,
    org_id: orgId,
    action,
    target_table: targetTable,
    target_id: targetId,
    before_json: before,
    after_json: after
  });
}
