import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const TestQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 quizData가 있다면 사용하고, 없으면 빈 배열로 설정
  const questions = location.state?.quizData || [];
  console.log(questions);

  // 20문제 더미 데이터
  // const questions = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   question: `문제 ${i + 1}: 이곳에 문제 내용이 들어갑니다.`,
  //   type: i % 2 === 0 ? "multiple" : "subjective", // 홀수는 주관식, 짝수는 객관식
  //   choices: ["선택지 1", "선택지 2", "선택지 3", "선택지 4"],
  //   answer: "",
  // }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 20분 타이머 (초 단위)

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

  // 문제 답변 저장
  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
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
    alert("답안이 제출되었습니다!");
    navigate("/quiz/result"); // 제출 후 결과 페이지로 이동
  };

  const isMultipleChoice = Array.isArray(questions.choices);

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
          {isMultipleChoice ? (
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
`;

const Title = styled.h3`
  text-align: center;
`;

const QuestionList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin: 20px 0;
`;

const QuestionButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 16px;
  border: none;
  border-radius: 50%;
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