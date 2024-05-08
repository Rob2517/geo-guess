import React from 'react';

const Feedback = ({ score, selectedState, gameMode, showSolution }) => {
  const getGameModeMessage = () => {
    switch (gameMode) {
      case 'name':
        return 'Can you guess the name of the state?';
      case 'capital':
        return 'Can you guess the capital of the state?';
      default:
        return '';
    }
  };

  const getFeedbackMessage = () => {
    if (!selectedState) {
      return 'Click on a state to begin!';
    } else if (showSolution) {
      return `The capital is ${showSolution}.`;
    } else if (gameMode === 'name' && selectedState.name) {
      return `The state is ${selectedState.name}.`;
    } else if (gameMode === 'capital' && selectedState.capital) {
      return `Can you guess the capital of ${selectedState.name}?`;
    } else {
      return 'Try again!';
    }
  };

  return (
    <div>
      <h2>{getGameModeMessage()}</h2>
      <p>Your score: {score}</p>
      <p>{getFeedbackMessage()}</p>
    </div>
  );
};

export default Feedback;