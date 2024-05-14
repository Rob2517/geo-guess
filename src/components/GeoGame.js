import React, { useState } from 'react';
import Map from './Map';
import stateData from './State-Data.json';
import L from 'leaflet';
import markerIcon from '../img/pin.png'; 

const GeoGame = () => {
  console.log('stateData:', stateData);
  const [selectedState, setSelectedState] = useState(null);
  const [score, setScore] = useState(0);

  const handleStateClick = (state) => {
    setSelectedState(state);
  };

  const handleCityGuess = (state, guess) => {
    if (guess.toLowerCase() === state.capital.toLowerCase()) {
      console.log('Correct guess!');
    } else {
      console.log('Incorrect guess.');
    }
  };

  const showSolution = (capital) => {
    console.log(`The capital is ${capital}.`);
  };

  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],

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
        setScore={setScore}
      />
    </div>
  );
};

export default GeoGame;