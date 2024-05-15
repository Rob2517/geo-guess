import React, { useState, memo, } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {maxScore} from './GeoGame.js';


const shouldShowStateName = (state, selectedState, handleCityGuess) => {
  return selectedState === state || (selectedState && handleCityGuess(state, selectedState.capital) === true);
};

const StateMarker = memo(({ state, selectedState, handleCityGuess, stateIcon, shouldShowStateNameFunc, handleStateGuess, score, setScore, guessedStates, onStateClick}) => {
  const [guessedState, setGuessedState] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasBeenGuessed, setHasBeenGuessed] = useState(guessedStates.includes(state.id));

  const handleGuess = () => {
    const isGuessCorrect = handleStateGuess(state, guessedState);
    setIsCorrect(isGuessCorrect);
    if (isGuessCorrect) {
      setScore((prevScore) => prevScore + 1);
      setHasBeenGuessed(true);
    }
    setGuessedState('');
  };

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
          <div>
            <p>Guess the state</p>
            <input
              type="text"
              value={guessedState}
              onChange={(e) => setGuessedState(e.target.value)}
              placeholder="Enter state name"
              disabled={hasBeenGuessed}
            />
            <button onClick={handleGuess}disabled={hasBeenGuessed}>Guess</button>
            {isCorrect === true && <p style={{ color: 'green' }}>Correct!</p>}
            {isCorrect === false && <p style={{ color: 'red' }}>Incorrect.</p>}
            <p>Your score is: {score}{maxScore}</p>
          </div>
        )}
      </Popup>
    </Marker>
  );
}, (prevProps, nextProps) => {
  return prevProps.state.id === nextProps.state.id &&
         prevProps.selectedState === nextProps.selectedState &&
         prevProps.handleCityGuess === nextProps.handleCityGuess &&
         prevProps.stateIcon === nextProps.stateIcon &&
         prevProps.shouldShowStateNameFunc === nextProps.shouldShowStateNameFunc &&
         prevProps.handleStateGuess === nextProps.handleStateGuess &&
         prevProps.score === nextProps.score &&
         prevProps.setScore === nextProps.setScore &&
         prevProps.guessedStates === nextProps.guessedStates;
});

const Map = ({ stateData, selectedState, onStateClick, stateIcon, onCityGuess, showSolution, guessedStates }) => {
  const [guessedCity, setGuessedCity] = useState('');
  const [score, setScore] = useState(0);

  const handleCityGuess = (state) => {
    onCityGuess(state, guessedCity);
    setGuessedCity('');
  };

  const handleStateGuess = (state, guess) => {
    if (guess.toLowerCase() === state.name.toLowerCase()) {
      return true;
    } else {
      return false;
    }
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
          handleStateGuess={handleStateGuess}
          score={score}
          setScore={setScore}
          guessedStates={guessedStates}
          eventHandlers={{
            click: guessedStates.includes(state.id)
              ? null
              : () => onStateClick(state),
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