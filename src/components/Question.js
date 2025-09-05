import React, { forwardRef } from "react";

// Question component displays the question text and its difficulty level.
// Uses forwardRef to allow parent to set focus for accessibility.
const Question = forwardRef(({ questionText, difficulty, tabIndex }, ref) => (
  <div className="question" ref={ref} tabIndex={tabIndex}>
    {/* Display question text */}
    <h2>{questionText}</h2>

    {/* Display difficulty if provided, with first letter capitalized */}
    {difficulty && (
      <p className={`difficulty difficulty-${difficulty}`}>
        Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </p>
    )}
  </div>
));

export default Question;
