
export type RecruitmentRole = 'guard' | 'bouncer' | 'cctv_tech' | 'community_partner' | 'retired_service';
export type RecruitmentStatus = 'pending' | 'reviewing' | 'interview_scheduled' | 'background_check' | 'approved' | 'rejected';

export interface Applicant {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: RecruitmentRole;
  city: string;
  area: string;
  status: RecruitmentStatus;
  reference_code: string;
  created_at: string;
}

export const ROLE_LABELS: Record<RecruitmentRole, string> = {
  guard: 'Security Guard',
  bouncer: 'Event Bouncer',
  cctv_tech: 'CCTV Technician',
  community_partner: 'Community Partner',
  retired_service: 'Retired Police/Military'
};

export const STATUS_COLORS: Record<RecruitmentStatus, string> = {
  pending: 'bg-gray-100 text-gray-700',
  reviewing: 'bg-blue-100 text-blue-700',
  interview_scheduled: 'bg-purple-100 text-purple-700',
  background_check: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700'
};
