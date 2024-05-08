import React, { useState } from 'react';

const GameControls = ({ onGameModeChange }) => {
  const [selectedGameMode, setSelectedGameMode] = useState('name');

  const handleGameModeChange = (mode) => {
    setSelectedGameMode(mode);
    onGameModeChange(mode);
  };

  return (
    <div>
      <h2>Game Modes</h2>
      <div>
        <label>
          <input
            type="radio"
            name="gameMode"
            value="name"
            checked={selectedGameMode === 'name'}
            onChange={() => handleGameModeChange('name')}
          />
          Guess the State Name
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="gameMode"
            value="capital"
            checked={selectedGameMode === 'capital'}
            onChange={() => handleGameModeChange('capital')}
          />
          Guess the State Capital
        </label>
      </div>
    </div>
  );
};

export default GameControls;