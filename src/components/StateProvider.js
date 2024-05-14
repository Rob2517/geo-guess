import React, { createContext, useState, useEffect } from 'react';

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState('name');

  useEffect(() => {
    try {
      const data = require('./State-Data.json');
      setStateData(data);
    } catch (error) {
      console.error('Error fetching state data:', error);
    }
  }, []);

  const handleStateClick = (state) => {
    if (state) {
      setSelectedState(state);
    } else {
      setSelectedState(null);
    }
  };

  const handleGameModeChange = (mode) => {
    setGameMode(mode);
  };

  return (
    <StateContext.Provider
      value={{
        stateData,
        selectedState,
        score,
        gameMode,
        handleStateClick,
        handleGameModeChange,
        setScore,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;