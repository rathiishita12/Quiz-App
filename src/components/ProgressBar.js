import React from "react";

// ProgressBar component shows quiz progress visually
// Props:
// - current: current question number
// - total: total number of questions
const ProgressBar = ({ current, total }) => {
  // Calculate percentage of completion
  const percent = (current / total) * 100;

  return (
    <div className="progress-bar" aria-label={`Question ${current} of ${total}`}>
      <div
        className="progress-bar-fill"
        style={{ width: `${percent}%` }} // set width based on progress
      />
    </div>
  );
};

export default ProgressBar;
