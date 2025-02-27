import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import PracticeQuiz from "./pages/QuizPage/PracticeQuiz";
import ResultPage from "./pages/QuizPage/ResultPage";
import SelectQuiz from "./pages/QuizPage/SelectQuiz";
import TestQuiz from "./pages/QuizPage/TestQuiz";
import { getUserId } from "./utils/userId";

const App = () => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId(getUserId()); // ✅ 최초 1회 실행 후 상태에 저장
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz/select" element={<SelectQuiz />} />
        <Route path="/quiz/practice" element={<PracticeQuiz />} />
        <Route path="/quiz/test" element={<TestQuiz />} />
        <Route path="/quiz/result" element={<ResultPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <ScrollToTopButton />
    </Router>
  );
};

export default App;
