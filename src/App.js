import React, { useState, useEffect, useRef } from "react";
import Question from "./components/Question";
import Options from "./components/Options";
import Results from "./components/Results";
import ProgressBar from "./components/ProgressBar";
import questionsData from "./data/questions.json";
import "./App.css";

function App() {
  // Total time for each question in seconds
  const totalTimePerQ = 30;

  // Ref to focus on the question element for accessibility
  const questionRef = useRef(null);

  // Ref to always have access to the latest selected option inside timer callbacks
  const selectedOptionRef = useRef(null);

  // State variables to manage quiz
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLefts, setTimeLefts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Reference for the timer interval
  const timerRef = useRef(null);

  // Sync selectedOptionRef with selectedOption state so timer callbacks get latest value
  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  // Load questions and saved state from localStorage on component mount
  useEffect(() => {
    setQuestions(questionsData);

    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      const { currentIndex, userAnswers, timeLefts, darkMode } =
        JSON.parse(savedState);

      setCurrentIndex(currentIndex);
      setUserAnswers(userAnswers);

      // Validate timeLeft array length else reset
      if (timeLefts.length === questionsData.length) {
        setTimeLefts(timeLefts);
      } else {
        setTimeLefts(Array(questionsData.length).fill(totalTimePerQ));
      }

      setDarkMode(darkMode ?? false);

      // Load answer for current question from userAnswers
      setSelectedOption(userAnswers[currentIndex] ?? null);
    } else {
      // No saved state: initialize timers for all questions
      setTimeLefts(Array(questionsData.length).fill(totalTimePerQ));
    }
  }, []);

  // Persist quiz state (current index, answers, timers, theme) to localStorage
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    localStorage.setItem(
      "quizState",
      JSON.stringify({ currentIndex, userAnswers, timeLefts, darkMode })
    );
  }, [currentIndex, userAnswers, timeLefts, darkMode]);

  // Manage timer and question focus
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (showResults || questions.length === 0) {
      clearInterval(timerRef.current);
      return;
    }

    clearInterval(timerRef.current);

    if (timeLefts[currentIndex] === 0) {
      handleNext(true, selectedOptionRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLefts((prev) => {
        const newTimes = [...prev];
        if (newTimes[currentIndex] > 0) {
          newTimes[currentIndex] -= 1;
        }
        if (newTimes[currentIndex] === 0) {
          clearInterval(timerRef.current);
          handleNext(true, selectedOptionRef.current);
        }
        return newTimes;
      });
    }, 1000);

    setSelectedOption(userAnswers[currentIndex] ?? null);
    questionRef.current?.focus();

    return () => clearInterval(timerRef.current);
  }, [currentIndex, showResults, questions.length]);

  // Calculate the user's total correct answers
  // eslint-disable-next-line no-unused-vars
  const calculateScore = (answers) => {
    return answers.reduce((acc, answer, idx) => {
      if (idx < questions.length && answer === questions[idx].answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  // Handle when user selects an option
  const handleOptionSelect = (option) => {
    if (timeLefts[currentIndex] > 0) {
      setSelectedOption(option);
    }
  };

  // Handle moving to next question
  const handleNext = (auto = false, selectedOpt) => {
    if (!auto && selectedOption === null) return;

    const answer = auto ? selectedOpt ?? null : selectedOption ?? null;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = answer;

    setUserAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
      clearInterval(timerRef.current);
    }
  };

  // Handle going to previous question
  const handlePrevious = () => {
    if (currentIndex > 0 && timeLefts[currentIndex - 1] > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Toggle theme
  const toggleTheme = () => setDarkMode(!darkMode);

  // Restart the quiz
  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setShowResults(false);
    setTimeLefts(Array(questionsData.length).fill(totalTimePerQ));
    localStorage.removeItem("quizState");
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <header className="app-header">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle light and dark mode"
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      {showResults ? (
        <>
          <h1>Quiz Results</h1>
          <Results
            questions={questions}
            userAnswers={userAnswers}
            restartQuiz={handleRestart}
          />
        </>
      ) : (
        <main role="main" aria-live="polite">
          <h1>Quiz App</h1>
          <ProgressBar current={currentIndex + 1} total={questions.length} />

          <div className="progress" aria-live="polite" aria-atomic="true">
            Question {currentIndex + 1} of {questions.length}
          </div>

          <div className="status">
            <span
              className="timer"
              aria-live="assertive"
              aria-atomic="true"
              aria-label={`Time left: ${timeLefts[currentIndex]} seconds`}
            >
              Time left: {timeLefts[currentIndex]}s
            </span>
          </div>

          <div key={currentIndex} className="fade-in">
            <Question
              ref={questionRef}
              questionText={questions[currentIndex].question}
              difficulty={questions[currentIndex].difficulty}
              tabIndex={-1}
            />
            <Options
              options={questions[currentIndex].options}
              selectedOption={selectedOption}
              handleSelect={handleOptionSelect}
              disabled={timeLefts[currentIndex] === 0}
            />

            <div className="navigation">
              <button
                onClick={handlePrevious}
                disabled={
                  currentIndex === 0 || timeLefts[currentIndex - 1] === 0
                }
                className="nav-btn"
                aria-disabled={
                  currentIndex === 0 || timeLefts[currentIndex - 1] === 0
                }
              >
                Previous
              </button>

              <button
                className="next-btn"
                onClick={() => handleNext(false)}
                disabled={
                  selectedOption === null || timeLefts[currentIndex] === 0
                }
              >
                {currentIndex + 1 === questions.length ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
