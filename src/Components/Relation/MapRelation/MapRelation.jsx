import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

function MapReaction({
  locations,
  selectedIndex,
  onMarkerClick,
  onLocationAdded,
  isRelation,
  routeLocations,
}) {
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);

  const defaultCenter = locations?.[0]?.position || [53.366, 14.52];

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (onLocationAdded) {
          console.log("Adding new location...");
          locations = null;
          setNewMarkerPosition([lat, lng]);
          onLocationAdded([lat, lng]);
        }
      },
    });
  }

  useEffect(() => {
    if (onLocationAdded && locations?.length > 0) {
      setNewMarkerPosition(locations[0].position);
    }
  }, [locations, onLocationAdded]);

  return (
    <div className="map-container-inner">
      <MapContainer center={defaultCenter} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {locations &&
          onMarkerClick &&
          locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={
                location.id === selectedIndex
                  ? highlightedMarkerIcon
                  : customMarkerIcon
              }
              eventHandlers={{
                click: () => onMarkerClick(location.id),
              }}
            />
          ))}

        {locations &&
          !onLocationAdded &&
          !isRelation &&
          locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={highlightedMarkerIcon}
            />
          ))}

        {newMarkerPosition && (
          <Marker position={newMarkerPosition} icon={customMarkerIcon} />
        )}

        {routeLocations && routeLocations.length > 1 && (
          <Polyline positions={routeLocations} color="green" />
        )}
      </MapContainer>
    </div>
  );
}

export default MapReaction;
