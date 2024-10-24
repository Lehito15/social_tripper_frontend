import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Niestandardowy marker (ikona)
const customMarkerIcon = new L.Icon({
  iconUrl: `${process.env.PUBLIC_URL}/like.png`, // Upewnij się, że ścieżka do pliku jest poprawna
  iconSize: [30, 40], // Rozmiar ikony
  iconAnchor: [15, 40], // Punkt kotwicy (środek dolnej krawędzi ikony)
  popupAnchor: [0, -40], // Punkt, w którym wyświetla się dymek
});

function MapReaction({ locations }) {
  // Sprawdzanie, czy mamy lokalizacje
  if (!locations || locations.length === 0) {
    return <div>No locations available</div>;
  }

  // Wybieranie pierwszej lokalizacji jako domyślne wyśrodkowanie mapy
  const defaultCenter = locations[0].position;

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map(location => (
        <Marker 
          key={location.id} 
          position={location.position} 
          icon={customMarkerIcon}
        >
          <Popup>{location.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapReaction;
