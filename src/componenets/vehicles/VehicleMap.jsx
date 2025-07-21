import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// ✅ Fix default marker icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

// ✅ Auto-fit bounds based on vehicle locations
const FitBounds = ({ vehicles }) => {
  const map = useMap();

  useEffect(() => {
    if (!vehicles || vehicles.length === 0) return;

    const validLocations = vehicles
      .filter(v => v?.location?.lat && v?.location?.lng)
      .map(v => [v.location.lat, v.location.lng]);

    if (validLocations.length > 0) {
      const bounds = L.latLngBounds(validLocations);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [vehicles, map]);

  return null;
};

const VehicleMap = ({ vehicles }) => {
  return (
    <div className="w-full h-[460px] md:h-[400px] lg:h-[500px] mt-6 rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-600">
      <MapContainer
        center={[28.6139, 77.2090]} // fallback center (Delhi)
        zoom={5}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        {/* 🌍 Tile layer from OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* 👇 Auto-fit map to visible vehicle markers */}
        <FitBounds vehicles={vehicles} />

        {/* 📍 Markers for each vehicle with popup info */}
        {vehicles.map(vehicle => (
          vehicle?.location?.lat &&
          vehicle?.location?.lng && (
            <Marker
              key={vehicle._id}
              position={[vehicle.location.lat, vehicle.location.lng]}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{vehicle.make} {vehicle.model}</strong><br />
                  Plate: {vehicle.licensePlate}<br />
                  Status: <span className="capitalize">{vehicle.status}</span>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default VehicleMap;
