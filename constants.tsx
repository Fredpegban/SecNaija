
import { Package, Zone } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'rapid-estate',
    name: 'RapidCover – Estate',
    price: '₦450k – ₦900k /mo',
    description: 'Estate-wide rapid response dispatch and reporting.',
    features: ['15-min SLA', 'Armed Backup Protocol', 'Weekly Reports']
  },
  {
    id: 'watch-perimeter',
    name: 'Watch – Perimeter',
    price: '₦250k – ₦650k /mo',
    description: '24/7 Remote CCTV Monitoring of perimeter areas.',
    features: ['Live AI Triage', 'Direct Dispatch Link', 'Hardware Included Option']
  },
  {
    id: 'estate-shield',
    name: 'Estate Shield Bundle',
    price: '₦1.8m – ₦6.5m /mo',
    description: 'Full-service guard management, dispatch, and monitoring.',
    features: ['Full Guard Force', 'Supervisors included', 'CCTV + Rapid Response']
  }
];

export const ZONES: Zone[] = [
  { id: '1', name: 'Mowe', sla: '12 mins', status: 'ACTIVE' },
  { id: '2', name: 'Ibafo', sla: '10 mins', status: 'ACTIVE' },
  { id: '3', name: 'Arepo', sla: '15 mins', status: 'ACTIVE' },
  { id: '4', name: 'Warewa', sla: '15 mins', status: 'ACTIVE' },
  { id: '5', name: 'Lagos Island', sla: 'N/A', status: 'COMING_SOON' }
];
