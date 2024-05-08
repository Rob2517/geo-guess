import React, { createContext, useState, useEffect } from 'react';

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState('name');

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await fetch('State-Data.json');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setStateData(data);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };

    fetchStateData();
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