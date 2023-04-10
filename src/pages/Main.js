import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../api/QuestionsAPI';
import { currentLogin } from '../globals';
import { updateHighscore } from '../api/ScoreAPI';
import { addAttempt } from '../api/QuestionsAPI';
import ResultMessage from '../components/ResultMessage';
import { getUser } from '../api/UserAPI';

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [originalQuestion, setOriginalQuestion] = useState(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  const fetchQuestionsAndUpdate = async () => {
    try {
      setIsWaiting(true);
      const json = await fetchQuestions();
      console.log(json);
      setQuestion(json["question"]);
      setAnswers(json["words"]);
      setCorrectAnswer(json["correct_word"]);
      setOriginalQuestion(json["original_question"]);
      setIsWaiting(false);
    } catch (error) {
      console.error('Failed to fetch and update data:', error);
    }
  };


  const handleHighscoreUpdate = async () => {
    try {
      const result = await updateHighscore(currentLogin, score);
      updateHighscoreLabel();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddingAttempt = async () => {
    try {
      const result = await addAttempt(currentLogin, score);
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkAnswer = () => {
    if (selectedAnswer == correctAnswer) {
      setIsAnsweredCorrectly(true);
      setScore(score + 1);
    } else {
      setIsAnsweredCorrectly(false);
      handleHighscoreUpdate();
      handleAddingAttempt();
    }
    setSelectedAnswer(null);
    setAnswers([]);
    // setCorrectAnswer(null);
    setQuestion(null);
  };

  const handleTryAgainButton = () => {
    console.log("Try again");
    fetchQuestionsAndUpdate();
    setIsAnsweredCorrectly(null);
    setScore(0);
  }

  const handleNextQuestionButton = () => {
    console.log("Next Question");
    fetchQuestionsAndUpdate();
    setIsAnsweredCorrectly(null);
  }

  const updateHighscoreLabel = async () => {
    try {
      const user = await getUser(currentLogin);
      setHighscore(user["highscore"]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchQuestionsAndUpdate();
    updateHighscoreLabel();
  }, []);

  return (
    <div className="App">
      <h1>Bad Translate</h1>
      <p>Highscore: {highscore}</p>
      <h3>Score: {score}</h3>
      {(question !== null) ? (
        <h2>{question}</h2>
      ) : (
        (isWaiting) && (<h2>Generating question...</h2>)
      )}
      <div>
        {answers.map((answer, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`answer-${index}`}
              name="answers"
              onChange={() => setSelectedAnswer(answer)}
            />
            <label htmlFor={`answer-${index}`}>{answer}</label>
          </div>
        ))}
      </div>
      {(isAnsweredCorrectly === null && question !== null && selectedAnswer !== null) && (
        <button onClick={checkAnswer}>Check Answer</button>
      )}
      <ResultMessage
        isCorrect={isAnsweredCorrectly}
        onNextQuestionClick={handleNextQuestionButton}
        onTryAgainClick={handleTryAgainButton}
        originalQuestion={originalQuestion}
        correctAnswer={correctAnswer}
      />
    </div>
  );
}

export default App;
