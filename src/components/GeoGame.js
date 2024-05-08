import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from './StateProvider';
import Feedback from './Feedback';
import GameControls from './GameControls';
import Map from './Map';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const GeoGame = () => {
  const {
    stateData,
    selectedState,
    score,
    gameMode,
    handleStateClick,
    handleGameModeChange,
    setScore,
  } = useContext(StateContext);

  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    // Fetch state data and update the stateData in the StateContext

  }, []);

  const handleCityGuess = (state, guess) => {
    if (guess.toLowerCase() === state.capital.toLowerCase()) {
      //Correct guess, update the score
      setScore((prevScore) => prevScore+1);
      setShowSolution(true);
    } else {
      // Incorrect guess, display the correct solution
      setShowSolution(true);
    }
  };
  
  // Define custom Leaflet icon for markers
  const stateIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="geo-game-container">
      {/* Text component (Feedback, GemeControls) */}
      <h1 style={{ marginBottom: '1rem' }}>Guess the State Capital</h1>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GameControls onGameModeChange={handleGameModeChange} />

        {/* map component */}
        <div className="map.contianer">
          <Map
            stateData={stateData}
            selectedState={selectedState}
            onStateClick={handleStateClick}
            stateIcon={stateIcon}
            onCityGuess={handleCityGuess}
            showSolution={(capital) => setShowSolution(capital)}
          />
        </div>
      </div>
      <Feedback
        score={score}
        selectedState={selectedState}
        gameMode={gameMode}
        showSolution={showSolution}
      />
    </div>
  );
};

export default GeoGame;