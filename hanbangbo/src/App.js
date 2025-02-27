import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import LandingPage from "./pages/LandingPage";
import PracticeQuiz from "./pages/QuizPage/PracticeQuiz";
import ResultPage from "./pages/QuizPage/ResultPage";
import SelectQuiz from "./pages/QuizPage/SelectQuiz";
import TestQuiz from "./pages/QuizPage/TestQuiz";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz/select" element={<SelectQuiz />} />
        <Route path="/quiz/practice" element={<PracticeQuiz />} />
        <Route path="/quiz/test" element={<TestQuiz />} />
        <Route path="/quiz/result" element={<ResultPage />} />
      </Routes>
      <ScrollToTopButton />
    </Router>
  );
};

export default App;
