import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const Map = ({
  stateData,
  selectedState,
  onStateClick,
  stateIcon,
  onCityGuess,
  showSolution,
  score,
  setScore,
}) => {
  if (!stateData || stateData.length === 0) {
    return <div>Loading...</div>;
  }

  try{

  return (
    <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stateData.map((state) => (
        <Marker
          key={state.id}
          position={[state.latitude, state.longitude]}
          icon={stateIcon}
          eventHandlers={{
            click: () => onStateClick(state),
          }}
        >
          <Popup>
            <h3>{state.name}</h3>
            <p>Capital: {state.capital}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );

} catch (error) {
  console.error('Error rendering Leaflet map:', error);
  return <div>Error loading map</div>;
}
}

export default Map;