
export enum UserRole {
  ORG_OWNER = 'ORG_OWNER',
  ORG_ADMIN = 'ORG_ADMIN',
  OPS_ADMIN = 'OPS_ADMIN',
  DISPATCHER = 'DISPATCHER',
  PATROL_MEMBER = 'PATROL_MEMBER',
  PUBLIC = 'PUBLIC'
}

export interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface Zone {
  id: string;
  name: string;
  sla: string;
  status: 'ACTIVE' | 'COMING_SOON';
}

export interface Incident {
  id: string;
  siteName: string;
  type: string;
  status: 'RECEIVED' | 'VERIFIED' | 'DISPATCHED' | 'RESOLVED';
  timestamp: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Organization {
  id: string;
  name: string;
  subscriptionStatus: 'ACTIVE' | 'PAST_DUE' | 'INACTIVE';
  packageId: string;
}
