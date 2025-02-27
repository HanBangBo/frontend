import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { submitQuizAnswer } from "../../api/apiService";

const TestQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 quizData가 있다면 사용하고, 없으면 빈 배열로 설정
  const quizData = location.state?.quizData || [];

  // 모든 Hook은 항상 최상위에서 호출
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(10); // 예시: 10초 타이머

  const handleTimeOverSubmit = useCallback(() => {
    const completedAnswers = answers.map((ans) =>
      ans === null ? "오답" : ans
    );
    alert("시간 종료! 답안을 자동 제출합니다.");
    navigate("/quiz/result", { state: { answers: completedAnswers } });
  }, [navigate, answers]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeOverSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleTimeOverSubmit]);

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
  };

  const goToQuestion = (index) => setCurrentIndex(index);
  const prevQuestion = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const nextQuestion = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, quizData.length - 1));

  const isAllAnswered = answers.every(
    (answer) => answer !== null && answer !== ""
  );

  // 모든 문제 제출 시, 각 문제의 정답 여부를 백엔드로 전송
  const submitResults = async () => {
    try {
      const results = quizData.map((q, index) => ({
        quiz_id: q.id,
        is_correct: answers[index] === q.correct ? "True" : "False",
      }));
      const quizIds = results.map((r) => r.quiz_id);
      const isCorrectArray = results.map((r) => r.is_correct);
      await submitQuizAnswer(quizIds, isCorrectArray);
      console.log("✅ 문제 풀이 결과 전송 완료!");
    } catch (error) {
      console.error("❌ 문제 풀이 결과 전송 실패:", error);
    }
  };

  const handleSubmit = async () => {
    if (!isAllAnswered) {
      alert("모든 문제를 풀어야 제출할 수 있습니다.");
      return;
    }
    await submitResults();
    alert("답안이 제출되었습니다!");
    navigate("/quiz/result", { state: { answers } });
  };

  return (
    <Container>
      {quizData.length === 0 ? (
        <Message>문제 데이터가 없습니다. 다시 시도해주세요.</Message>
      ) : (
        <>
          {/* 왼쪽 문제 목록 패널 */}
          <Sidebar>
            <Title>문제 목록</Title>
            <QuestionList>
              {quizData.map((_, index) => (
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
            <Header>
              <Timer>
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </Timer>
              <SubmitButton disabled={!isAllAnswered} onClick={handleSubmit}>
                문제 제출
              </SubmitButton>
            </Header>

            <QuestionContent>
              <h1>{quizData[currentIndex].question}</h1>
              <AnswerContainer>
                {quizData[currentIndex].type === "multiple" ? (
                  <Choices>
                    {quizData[currentIndex].choices.map((choice, i) => (
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
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      e.target.value === "" &&
                      (e.target.placeholder = "답을 입력하세요")
                    }
                    value={answers[currentIndex] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                  />
                )}
              </AnswerContainer>
            </QuestionContent>

            <Navigation>
              <NavButton onClick={prevQuestion} disabled={currentIndex === 0}>
                이전 문제
              </NavButton>
              <NavButton
                onClick={nextQuestion}
                disabled={currentIndex === quizData.length - 1}
              >
                다음 문제
              </NavButton>
            </Navigation>
          </MainContent>
        </>
      )}
    </Container>
  );
};

export default TestQuiz;

/* 스타일 */
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Message = styled.p`
  text-align: center;
  font-size: 20px;
  margin: auto;
`;

const Sidebar = styled.div`
  width: 20%;
  background: #f7f7f7;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 24px;
`;

const QuestionList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 50px;
  column-gap: 15px;
  margin: 20px 0;
  justify-items: center;
`;

const QuestionButton = styled.button`
  width: 60px;
  height: 60px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
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

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
`;

const Choices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  margin-top: 2rem;
`;

const ChoiceButton = styled.button`
  padding: 12px 16px;
  font-size: 20px;
  background: ${({ selected }) => (selected ? "#4caf50" : "#f3f3f3")};
  color: ${({ selected }) => (selected ? "#000" : "#333")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: ${({ selected }) =>
    selected ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none"};
  transition: box-shadow 0.3s, color 0.3s;
`;

const Input = styled.input`
  padding: 10px;
  width: 60%;
  font-size: 16px;
  text-align: center;
  margin: 2rem auto;
  display: block;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavButton = styled.button`
  padding: 10px;
  font-size: 16px;
`;
