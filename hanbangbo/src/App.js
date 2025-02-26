import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PracticeQuiz from "./pages/QuizPage/PracticeQuiz";
import SelectQuiz from "./pages/QuizPage/SelectQuiz";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz/select" element={<SelectQuiz />} />
        <Route path="/quiz/practice" element={<PracticeQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
