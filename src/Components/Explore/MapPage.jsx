import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css'; // Upewnij się, że ten plik zawiera powyższe style

function MapPage() {
  return (
    <div className="map-container">
      <MapContainer center={[53.447, 14.511]} zoom={13}  style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Dodaj marker lub inne elementy */}
       
      </MapContainer>
    </div>
  );
}

export default MapPage;
