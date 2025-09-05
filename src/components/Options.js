import React from "react";

// Options component renders multiple choice options as buttons
// Props:
// - options: array of answer options
// - selectedOption: the option currently selected by the user
// - handleSelect: function to handle option selection
// - disabled: disables all buttons (e.g., after submission)
const Options = ({ options, selectedOption, handleSelect, disabled }) => {
  return (
    <div className="options" role="list">
      {options.map((option) => (
        <button
          key={option} // unique key for each option
          onClick={() => handleSelect(option)} // handle user selection
          disabled={disabled} // disable button when needed
          className={selectedOption === option ? "selected" : ""} // highlight if selected
          aria-pressed={selectedOption === option} // accessibility: indicates active state
          tabIndex={0}
          aria-label={`Answer option: ${option}`} // accessibility label
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
