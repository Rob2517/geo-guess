import React, { useState, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const StateMarker = memo ({ state, selectedState, handleCityGuess, stateIcon }) ; {
 const shouldShowStateName = selectedState === (state) || (selectedState && handleCityGuess(state, selectedState.capital) === true);



const Map = ({ stateData, selectedState, onStateClick, stateIcon, onCityGuess, showSolution }) => {
  const [guessedCity, setGuessedCity] = useState('');

  const handleCityGuess = (state) => {
    onCityGuess(state, guessedCity);
    setGuessedCity('');
  };

  const shouldShowStateName = (state) => {
    return state === selectedState || handleCityGuess(state, state.capital) === true;
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
    <Marker
    key={state.id}
    position={[state.latitude,state.longitude]}
    icon={stateIcon}
    ></Marker>
    
      {stateData.map((state) => (
        <StateMarker
          key={state.id}
          state={state}
          position={[state.latitude, state.longitude]}
          handleCityGuess={handleCityGuess}
          stateIcon={stateIcon}
          eventHandlers={{
            click: () => onStateClick(state),
          }}
        >
          <Popup>
            <h3>{state.name}</h3>
            <p>Capital: {state.capital}</p>

            {shouldShowStateName? (
              <div>
                <h3>{state.name}</h3>
                <p>Capital: {state.capital}</p>
                </div>
            ) : (
              <p>Guess the state</p>
            )}
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
       ) 
       )}
    
    </MapContainer>
  );
   }
 }; 
  

export default Map