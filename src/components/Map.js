// Map.js
import React, { useState, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const shouldShowStateName = (state, selectedState, handleCityGuess) => {
  return selectedState === state || (selectedState && handleCityGuess(state, selectedState.capital) === true);
};

const StateMarker = memo(({ state, selectedState, handleCityGuess, stateIcon, shouldShowStateNameFunc }) => {
  return (
    <Marker
      key={state.id}
      position={[state.latitude, state.longitude]}
      icon={stateIcon}
    >
      <Popup>
        {shouldShowStateNameFunc(state, selectedState, handleCityGuess) ? (
          <div>
            <h3>{state.name}</h3>
            <p>Capital: {state.capital}</p>
          </div>
        ) : (
          <p>Guess the state</p>
        )}
      </Popup>
    </Marker>
  );
}, (prevProps, nextProps) => {
  return prevProps.state.id === nextProps.state.id &&
         prevProps.selectedState === nextProps.selectedState &&
         prevProps.handleCityGuess === nextProps.handleCityGuess &&
         prevProps.stateIcon === nextProps.stateIcon &&
         prevProps.shouldShowStateNameFunc === nextProps.shouldShowStateNameFunc;
});

const Map = ({ stateData, selectedState, onStateClick, stateIcon, onCityGuess, showSolution }) => {
  const [guessedCity, setGuessedCity] = useState('');

  const handleCityGuess = (state) => {
    onCityGuess(state, guessedCity);
    setGuessedCity('');
  };

  return (
    <MapContainer center={[37.0902, -95.7129]} zoom={4} scrollWheelZoom={false} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {stateData.map((state) => (
        <StateMarker
          key={state.id}
          state={state}
          selectedState={selectedState}
          handleCityGuess={handleCityGuess}
          stateIcon={stateIcon}
          shouldShowStateNameFunc={shouldShowStateName}
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
        </StateMarker>
      ))}
    </MapContainer>
  );
};

export default Map;