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
  const Feedback = ({selectedState, showSolution, isCorrectGuess}) => {
  const getFeedbackMessage = (state, showSolution, isCorrectedGuess) => {
    if (!state) {
      // return 'Click on a state to begin!';
      return 'Guess the state capital';
    } else if (showSolution || isCorrectGuess) {
      return `The capital of ${state.name} is ${state.capital}`;
    // } else if (gameMode === 'name' && selectedState.name) {
    //   return `The state is ${selectedState.name}.`;
    // } else if (gameMode === 'capital' && selectedState.capital) {
    //   return `Can you guess the capital of ${selectedState.name}?`;
    } else {
      // return 'Try again!';
     return 'Good Job!';
    }
  };

  return (
    // <div>
      // <h2>{getGameModeMessage()}</h2>
      {/* <p>Your score: {score}</p> */},
      {/* <p>{getFeedbackMessage()}</p> */},
    // </div>
    <div className="feedback">
      {getFeedbackMessage(selectedState, showSolution, isCorrectGuess)}
    </div>

  );
};
}
export default Feedback;