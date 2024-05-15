import React, { useState } from 'react';
import Map from './Map';
import stateData from './State-Data.json';
import L from 'leaflet';
import markerIcon from '../img/pin.png'; 

export const maxScore = '/50';

const GeoGame = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [score, setScore] = useState(0);
  const [guessedStates, setGuessedStates] = useState([]);
  

  const handleStateClick = (state) => {
    setSelectedState(state);
  };

  const handleCityGuess = (state, guess) => {
    if (guess.toLowerCase() === state.capital.toLowerCase()) {
      if (!guessedStates.includes(state.id)) {
      setScore(score + 1);
      setGuessedStates([...guessedStates, state.id]);
      console.log('Correct guess! Score:', score, maxScore);
    } else {
      console.log('You already guessed this state.');
    }
    } else {
      console.log('Incorrect guess. Score:', score, maxScore);
    }
  };

  const showSolution = (capital) => {
    console.log(`The capital is ${capital}.`);
  };

  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [20, 25],
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconDefaultUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  });

  return (
    <div>
      <Map
        stateData={stateData}
        selectedState={selectedState}
        onStateClick={handleStateClick}
        stateIcon={customIcon}
        onCityGuess={handleCityGuess}
        showSolution={showSolution}
        score={score}
        guessedStates={guessedStates}
      />
    </div>
  );
};

export default GeoGame;