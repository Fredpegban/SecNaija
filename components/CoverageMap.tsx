import React from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icon assets
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ZONES_COORDS = [
  { name: 'Mowe', lat: 6.8117, lng: 3.4357, status: 'ACTIVE', radius: 1500, sla: '12 min' },
  { name: 'Ibafo', lat: 6.7554, lng: 3.4211, status: 'ACTIVE', radius: 1200, sla: '10 min' },
  { name: 'Arepo', lat: 6.7032, lng: 3.3985, status: 'ACTIVE', radius: 1000, sla: '15 min' },
  { name: 'Warewa', lat: 6.6781, lng: 3.3854, status: 'ACTIVE', radius: 800, sla: '15 min' },
  { name: 'Lagos Island', lat: 6.4549, lng: 3.4246, status: 'UPCOMING', radius: 2000, sla: 'Q4 2024' }
];

export default function CoverageMap() {
  const center: [number, number] = [6.72, 3.41]; // Centered on the corridor

  return (
    <div className="w-full h-full">
      <MapContainer 
        center={center} 
        zoom={11} 
        scrollWheelZoom={false}
        className="h-full rounded-2xl shadow-inner border border-slate-200"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {ZONES_COORDS.map((zone, idx) => (
          <Circle
            key={idx}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              fillColor: zone.status === 'ACTIVE' ? '#22c55e' : '#f59e0b',
              color: zone.status === 'ACTIVE' ? '#16a34a' : '#d97706',
              weight: 2,
              fillOpacity: 0.3
            }}
          >
            <Popup>
              <div className="p-1">
                <h4 className="font-bold text-slate-900 m-0">{zone.name}</h4>
                <p className="text-xs text-slate-500 m-0">{zone.status === 'ACTIVE' ? 'Active Coverage' : 'Upcoming Expansion'}</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">SLA</span>
                  <span className="text-[10px] font-bold text-indigo-600">{zone.sla}</span>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}
