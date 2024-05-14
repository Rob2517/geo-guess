import React, { useContext, useState, } from 'react';
import { StateContext } from './StateProvider';
import Feedback from './Feedback';
import GameControls from './GameControls';
import Map from './Map';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './GeoGame.css'

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
  const [IsCorrectGuess, setIsCorrectGuess] = useState(false);
 

  // Define custom Leaflet icon for markers
  const stateIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleCityGuess = (state, guess) => {
  //   if (guess.toLowerCase() === state.capital.toLowerCase()) {
  //     //Correct guess, update the score
  //     setScore((prevScore) => prevScore + 1);
  //     setShowSolution(false);
  //     setIsCorrectGuess(true);
  //   } else {
  //     // Incorrect guess, display the correct solution
  //     setShowSolution(true);
  //     setIsCorrectGuess(false);
  //   }
  // };
  if (selectedState && guess.toLowerCase() === selectedState.capital.toLowerCase()) {
    // Correct guess, update the score
    setScore((prevScore) => prevScore + 1);
    setShowSolution(false);
    setIsCorrectGuess(true);
  } else {
    // Incorrect guess, display the correct solution
    setShowSolution(true);
    setIsCorrectGuess(false);
  }
};

  
  const shouldShowCapital = showSolution || IsCorrectGuess;


  return (
    <div className="geo-game-container">

      {/* Text component (Feedback, GemeControls) */}

      {/* <div className="text-container"> */}

        {/* Score and Capital Solution */}
        {/* <div className="score-solution-container"></div> */}

        <div className="game-controls-container"></div>

        <GameControls 
        onGameModeChange={handleGameModeChange}  
        // score={score}
        gameMode={gameMode}
        handleGameModeChange={handleGameModeChange}/>

        <div className="score">Your Score: {score}</div>

        {/*Feedback and Map */}

        <div className="map-contianer">
          <div className="feedback-contianer">
            {shouldShowCapital && selectedState && (
            <div className="capital-solution"> The capital is {selectedState.capital}
        </div>
        )}
        
      <Feedback 
      selectedState={selectedState} 
      showSolution={showSolution}
      IsCorrectGuess={IsCorrectGuess}/>
      </div>

        {/* map component */}
          <Map
            stateData={stateData}
            selectedState={selectedState}
            onStateClick={handleStateClick}
            stateIcon={stateIcon}
            // handleStateClick={handleStateClick}
            handleCityGuess={handleCityGuess}
            onCityGuess={handleCityGuess}
            // showSolution={(capital) => setShowSolution(capital)}
          />
        </div>
      {/* </div> */}
    </div>
  );
};

export default GeoGame;