# React Quiz App – Timed Questions & Difficulty Levels

## Overview

This is a professional React-based quiz application featuring:
- Timed questions
- Difficulty indication for each question
- Next/Previous navigation
- Results page showing user answers, correct answers, and your total score
- Dark/Light theme toggle for better accessibility and user comfort

## Features

- **Timer:** Each question has a 30-second countdown and auto-submits when time runs out.
- **Difficulty Display:** Difficulty level (Easy, Medium, Hard) shown with each question.
- **Navigation:** Move through the quiz using Next and Previous buttons; Previous is disabled if a question's timer expired.
- **Answer Selection:** Choose one option per question. Your answer is submitted automatically on timer expiry or when you click Next.
- **Results Page:** Displays your final score and shows a side-by-side comparison of your answer and the correct answer for each question.
- **Theme Toggle:** Instantly switch between light and dark UI modes.
- **Accessibility:** Keyboard friendly, focus indicators, and screen-reader support.
- **Persistent State:** Quiz progress is saved in localStorage, so refreshing the page retains your answers and timers.

## Installation & Running

1. **Clone or download/unzip the project folder**
2. In terminal, navigate to the project directory:
cd QuizApp
3. **Install dependencies:**
npm install
4. **Start development server:**
npm start
The app will open in your browser on [http://localhost:3000](http://localhost:3000).

5. **Build for production (optional):**
npm run build

## How to Use

- Click an option to select your answer for each question.
- Use Next to go forward, Previous to go back (if allowed).
- Timer auto-submits selection after 30 seconds.
- Toggle dark/light mode using the button at the top-right.
- At the end, review your results and score. Click “Restart Quiz” to begin anew.

## File Structure

QuizApp/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── components/
│   │   ├── Question.js
│   │   ├── Options.js
│   │   ├── Results.js
│   │   ├── ProgressBar.js
│   ├── data/
│   │   └── questions.json
├── public/
├── package.json
├── README.md

#### - `src/App.js`: Controls main quiz logic, navigation, timer, localStorage, theme
#### - `src/components/`: All UI subcomponents for modular, clean code
#### - `src/data/questions.json`: Stores questions and their difficulty levels
#### - `src/App.css`: Responsive styles and accessibility

## Accessibility & Notes

- Keyboard navigation and ARIA attributes included.

## Author & Submission

- **Name:** Ishita Rathi
- **Date:** 05/09/2025
- **Contact:** rathiishita24@gmail.com

## Screenshots
![alt text](<Screenshots/Screenshot 2025-09-05 at 6.43.28 AM.png>)
![alt text](<Screenshots/Screenshot 2025-09-05 at 6.43.45 AM.png>)
![alt text](<Screenshots/Screenshot 2025-09-05 at 6.44.07 AM.png>)
![alt text](<Screenshots/Screenshot 2025-09-05 at 6.44.12 AM.png>)
