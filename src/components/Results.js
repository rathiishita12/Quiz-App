import React from "react";

// Results component displays final quiz results
// Props:
// - questions: array of quiz questions
// - userAnswers: array of user-selected answers
// - restartQuiz: function to restart the quiz
const Results = ({ questions, userAnswers, restartQuiz }) => {
  // Calculate total correct answers by comparing userAnswers with correct answers
  const score = userAnswers.reduce((acc, answer, idx) => {
    if (answer === questions[idx].answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="results">
      <h2>Your Results</h2>
      <p className="scoreboard">
        You scored {score} / {questions.length}
      </p>

      <ul>
        {questions.map((q, idx) => {
          // Get user's answer or fallback to "No answer"
          const userAnswer = userAnswers[idx] ?? "No answer";
          // Check if user's answer matches the correct answer
          const isCorrect = userAnswer === (q?.answer ?? "");

          return (
            <li key={q.id} className={isCorrect ? "correct" : "incorrect"}>
              <p><strong>Q{idx + 1}:</strong> {q?.question}</p>
              <div className="answer-pair">
                <div>
                  <p className="label">Your Answer:</p>
                  <p
                    className={`answer ${isCorrect ? "correct-text" : "incorrect-text"}`}
                  >
                    {userAnswer}
                  </p>
                </div>
                <div>
                  <p className="label">Correct Answer:</p>
                  <p className="answer correct-text">{q?.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Restart button to reset quiz */}
      <button className="restart-btn" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
