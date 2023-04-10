import React from 'react';

function ResultMessage({ isCorrect, onNextQuestionClick, onTryAgainClick, originalQuestion, correctAnswer }) {
  const handleNextQuestionClick = () => {
    onNextQuestionClick();
  };

  const handleTryAgainClick = () => {
    onTryAgainClick();
  };

  if (isCorrect === null) {
    return null;
  }

  return (
    <>
      {isCorrect ? (
        <>
          <h2>Correct!</h2>
          <p>Correct Answer: <b>{correctAnswer}</b></p>
          <p>Original Translation: {originalQuestion}</p>
          <button onClick={handleNextQuestionClick}>Next Question</button>
        </>
      ) : (
        <>
          <h2>Wrong</h2>
          <p>Correct Answer: <b>{correctAnswer}</b></p>
          <p>Original Translation: {originalQuestion}</p>
          <button onClick={handleTryAgainClick}>Try Again</button>
        </>
      )}
    </>
  );
}

export default ResultMessage;
