import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const LeafletRoutePlanner = () => {
  const [routeCoords, setRouteCoords] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [travelTime, setTravelTime] = useState(null);
  const [distance, setDistance] = useState(null);
  const [mode, setMode] = useState("driving-car");

  const getRoute = async () => {
    const API_KEY = import.meta.env.VITE_ORS_API_KEY;
    const url = `https://api.openrouteservice.org/v2/directions/${mode}/geojson`;

    try {
      const [startRes, endRes] = await Promise.all([
        axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`),
        axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`),
      ]);

      const startCoords = [
        parseFloat(startRes.data[0].lon),
        parseFloat(startRes.data[0].lat),
      ];
      const endCoords = [
        parseFloat(endRes.data[0].lon),
        parseFloat(endRes.data[0].lat),
      ];

      const response = await axios.post(
        url,
        {
          coordinates: [startCoords, endCoords],
        },
        {
          headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const coords = response.data.features[0].geometry.coordinates.map(
        ([lon, lat]) => [lat, lon]
      );
      const summary = response.data.features[0].properties.summary;

      setRouteCoords(coords);
      setDistance((summary.distance / 1000).toFixed(2)); // km
      setTravelTime((summary.duration / 60).toFixed(2)); // minutes
    } catch (err) {
      alert("Failed to fetch route. Check location names.");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">Live Route Planner (Real Locations)</h2>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Start (e.g., Delhi)"
          className="p-2 border rounded w-full md:w-1/4"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="text"
          placeholder="End (e.g., Mumbai)"
          className="p-2 border rounded w-full md:w-1/4"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full md:w-1/4"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="driving-car">Car</option>
          <option value="cycling-regular">Bike</option>
          <option value="foot-walking">Walking</option>
          <option value="wheelchair">Wheelchair</option>
        </select>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={getRoute}
        >
          Get Route
        </button>
      </div>

      {travelTime && (
        <div className="text-center mt-4 text-lg font-medium text-gray-800">
          <p>Estimated Time: {travelTime} min</p>
          <p>Distance: {distance} km</p>
        </div>
      )}

      <div className="mt-6">
        <MapContainer
          center={[22.9734, 78.6569]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="blue" />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default LeafletRoutePlanner;
