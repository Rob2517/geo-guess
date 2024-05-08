import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ stateData, onStateClick, stateIcon, onCityGuess, showSolution }) => {
  const [guessedCity, setGuessedCity] = useState('');

  const handleCityGuess = (state) => {
    onCityGuess(state, guessedCity);
    setGuessedCity('');
  };

  return (
    <MapContainer center={[37.0902, -95.7129]} 
        zoom={4} 
        scrollWheelZoom={false} 
        style={{ height: '80vh', width: '100%' }}>

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
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
            <input
              type="text"
              value={guessedCity}
              onChange={(e) => setGuessedCity(e.target.value)}
              placeholder="Guess the capital"
            />
            <button onClick={() => handleCityGuess(state)}>Guess</button>
            <button onClick={() => showSolution(state.capital)}>See solution</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;