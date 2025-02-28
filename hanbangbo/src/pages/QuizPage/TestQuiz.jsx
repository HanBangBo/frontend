import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { submitQuizAnswer } from "../../api/apiService";


const TestQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL로 직접 접근했을 때 대비하여 기본값 설정
  const questions = location.state?.quizData || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(""); // 사용자 응답
  const [result, setResult] = useState(null); // 정답 여부 결과
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [quizResults, setQuizResults] = useState([]); // 정답 여부 저장 배열
  const [timeLeft, setTimeLeft] = useState(2000); // 20분 타이머 (초 단위)

  // 제한 시간 초과 시 자동 제출 (미답안은 "오답" 처리)
  const handleTimeOverSubmit = useCallback(() => {
    const completedAnswers = answers.map((ans) =>
      ans === null ? "오답" : ans
    );
    alert("시간 종료! 답안을 자동 제출합니다.");
    navigate("/quiz/result", { state: { answers: completedAnswers } });
  }, [navigate, answers]); // `navigate`만 의존성으로 설정

  // 타이머 동작
  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeOverSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleTimeOverSubmit]);

    const submitResults = useCallback(async () => {
      try {
        const quizIds = quizResults.map((item) => item.quiz_id);
        const isCorrectArray = quizResults.map((item) => item.is_correct);
        await submitQuizAnswer(quizIds, isCorrectArray);
        console.log("✅ 문제 풀이 결과 전송 완료!");
      } catch (error) {
        console.error("❌ 문제 풀이 결과 전송 실패:", error);
      }
    }, [quizResults]);

  // 문제 답변 저장
  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
    setSelectedAnswer(answer);
    handleSubmitAnswer();
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentIndex] || {};
    const isCorrect = selectedAnswer === currentQuestion.correct;
    setResult(isCorrect ? "정답 ✅" : "오답 ❌");

    // 정답 여부 저장 (누적)
    setQuizResults((prev) => [
      ...prev,
      { quiz_id: currentQuestion.id, is_correct: isCorrect ? "True" : "False" },
    ]);
  };

  // 문제 번호 클릭 시 이동
  const goToQuestion = (index) => setCurrentIndex(index);

  // 이전/다음 문제 이동
  const prevQuestion = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const nextQuestion = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));

  // 모든 문제를 풀었을 때만 제출 가능
  const isAllAnswered = answers.every(
    (answer) => answer !== null && answer !== ""
  );

  // 문제 제출
  const handleSubmit = () => {
    if (!isAllAnswered) {
      alert("모든 문제를 풀어야 제출할 수 있습니다.");
      return;
    }
    submitResults();
    alert("답안이 제출되었습니다!");
    // 답변 제출 코드
    const questions = location.state?.quizData || [];
    navigate("/quiz/result"); // 제출 후 결과 페이지로 이동
  };

  return (
    <Container>
      {/* 왼쪽 문제 목록 패널 */}
      <Sidebar>
        <Title>문제 목록</Title>
        <QuestionList>
          {questions.map((_, index) => (
            <QuestionButton
              key={index}
              answered={answers[index] !== null && answers[index] !== ""}
              onClick={() => goToQuestion(index)}
            >
              {index + 1}
            </QuestionButton>
          ))}
        </QuestionList>
        <SubmitButton disabled={!isAllAnswered} onClick={handleSubmit}>
          문제 제출
        </SubmitButton>
      </Sidebar>

      {/* 오른쪽 문제 풀이 영역 */}
      <MainContent>
        {/* 타이머 */}
        <Header>
          <Timer>
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </Timer>
          <SubmitButton disabled={!isAllAnswered} onClick={handleSubmit}>
            문제 제출
          </SubmitButton>
        </Header>

        {/* 현재 문제 표시 */}
        <QuestionContent>
          <h2>{questions[currentIndex].quiz_content}</h2>
          {questions[currentIndex].choices.length !== 1 ? (
            <Choices>
              {questions[currentIndex].choices.map((choice, i) => (
                <ChoiceButton
                  key={i}
                  selected={answers[currentIndex] === choice}
                  onClick={() => handleAnswerChange(choice)}
                >
                  {choice}
                </ChoiceButton>
              ))}
            </Choices>
          ) : (
            <Input
              type="text"
              placeholder="답을 입력하세요"
              value={answers[currentIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          )}
        </QuestionContent>

        {/* 이전/다음 문제 버튼 */}
        <Navigation>
          <NavButton onClick={prevQuestion} disabled={currentIndex === 0}>
            이전 문제
          </NavButton>
          <NavButton
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
          >
            다음 문제
          </NavButton>
        </Navigation>
      </MainContent>
    </Container>
  );
};

export default TestQuiz;

/* 스타일 */
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 25%;
  background: #f7f7f7;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
`;

const QuestionList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 35px;
  margin: 20px 0;
`;

const QuestionButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 16px;
  border: none;
  border-radius:20%;
  background: ${({ answered }) => (answered ? "#4caf50" : "#ddd")};
  color: white;
  cursor: pointer;

  &:hover {
    background: #2196f3;
  }
`;

const SubmitButton = styled.button`
  margin-top: auto;
  padding: 10px;
  font-size: 16px;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#ff6b6b")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#e63946")};
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Timer = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: red;
`;

const QuestionContent = styled.div`
  margin: 20px 0;
`;

const Choices = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChoiceButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background: ${({ selected }) => (selected ? "#4caf50" : "#f3f3f3")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavButton = styled.button`
  padding: 10px;
  font-size: 16px;
`;