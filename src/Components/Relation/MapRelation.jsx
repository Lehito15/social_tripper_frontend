import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Niestandardowe ikony markerów
const customMarkerIcon = new L.Icon({
  iconUrl: `${process.env.PUBLIC_URL}/like.png`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const highlightedMarkerIcon = new L.Icon({
  iconUrl: `${process.env.PUBLIC_URL}/create-trip.png`,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});

function MapReaction({ locations, selectedIndex, onMarkerClick, onLocationAdded, isRelation }) {
  // const [newMarkerPosition, setNewMarkerPosition] = useState(locations?.[0]?.position || null);
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);

  const defaultCenter = locations?.[0]?.position || [53.366, 14.52];
  console.log(locations);

  // Funkcja obsługująca kliknięcia na mapie, dodająca nowy marker
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        // setNewMarkerPosition([lat, lng]);

        // Wywołaj onLocationAdded, jeśli został przekazany
        if (onLocationAdded) {
          console.log('dodaje nowo')
          locations = null;
          setNewMarkerPosition([lat, lng]);
          onLocationAdded([lat, lng]);
        }
      },
    });
    // return null;
  }

  useEffect(() => {
    // Sprawdzamy, czy istnieje onLocationAdded i czy locations ma odpowiednią długość
    if (onLocationAdded && locations?.length > 0) {
      // Jeśli onLocationAdded jest dostępne, ustawiamy nową pozycję markera z pierwszej lokalizacji
      setNewMarkerPosition(locations[0].position);
    }
  }, [locations, onLocationAdded]);

  return (
    <div className='map-container-inner'>
    <MapContainer center={defaultCenter} zoom={13} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Komponent obsługujący kliknięcia */}
      <MapClickHandler />

      {/* Istniejące lokalizacje */}
      {locations && onMarkerClick&&
        locations.map(location => (
          <Marker
            key={location.id}
            position={location.position}
            icon={location.id === selectedIndex ? highlightedMarkerIcon : customMarkerIcon}
            eventHandlers={{
              click: () => onMarkerClick(location.id),
            }}
          />
        ))}

        {locations && !onLocationAdded && !isRelation && (
          locations.map(location => (
            <Marker
              key={location.id}
              position={location.position}
              icon ={ highlightedMarkerIcon}
              
              
            />
        )))}

      {/* Nowa pinezka na podstawie kliknięcia */}
      {newMarkerPosition && (
        <Marker position={newMarkerPosition} icon={customMarkerIcon} />
      )}
    </MapContainer>
    </div>
  );
}

export default MapReaction;
