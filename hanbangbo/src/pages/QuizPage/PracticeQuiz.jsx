import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";

const PracticeQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ URL로 직접 접근했을 때 대비하여 기본값 설정
  const quizData = location.state?.quizData || [
    {
      id: 1,
      quiz_content: "기본 문제 (데이터 없음)",
      correct: "정답",
      quiz_comment: "이 문제는 기본 데이터입니다.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(""); // 사용자 응답
  const [result, setResult] = useState(null); // 정답 여부 결과

  const currentQuestion = quizData[currentIndex];
  const isMultipleChoice = !!currentQuestion.choices; // ✅ 객관식 여부 판단
  const isLastQuestion = currentIndex === quizData.length - 1;

  // ✅ 정답 제출 및 채점
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setResult(
      selectedAnswer === currentQuestion.correct ? "정답 ✅" : "오답 ❌"
    );
  };

  // ✅ 다음 문제로 이동
  const handleNextQuestion = () => {
    setResult(null); // ✅ 결과 초기화
    setSelectedAnswer(""); // ✅ 선택한 답 초기화
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <Container>
      <NavigationBar />
      <h2>{currentQuestion.quiz_content}</h2>

      {/* ✅ 문제 풀이 단계 */}
      {!result ? (
        isMultipleChoice ? (
          <Options>
            {currentQuestion.choices.map((choice) => (
              <OptionButton
                key={choice}
                onClick={() => setSelectedAnswer(choice)}
                selected={selectedAnswer === choice}
              >
                {choice}
              </OptionButton>
            ))}
          </Options>
        ) : (
          <InputAnswer
            type="text"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            placeholder="정답을 입력하세요"
          />
        )
      ) : (
        <>
          <ResultMessage>{result}</ResultMessage>
          <CommentBox>{currentQuestion.quiz_comment}</CommentBox>
        </>
      )}

      {/* ✅ 버튼 UI */}
      {!result ? (
        <SubmitButton onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
          제출하기
        </SubmitButton>
      ) : isLastQuestion ? (
        <HomeButton onClick={() => navigate("/")}>홈으로 가기</HomeButton>
      ) : (
        <NextButton onClick={handleNextQuestion}>다음 문제</NextButton>
      )}
    </Container>
  );
};

export default PracticeQuiz;

/* ✅ 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background: ${(props) => (props.selected ? "#2575fc" : "#f3f3f3")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #2575fc;
    color: white;
  }
`;

const InputAnswer = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ff6b6b")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#e63946")};
  }
`;

const ResultMessage = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.children === "정답 ✅" ? "green" : "red")};
`;

const CommentBox = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f3f3f3;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 500px;
  text-align: center;
  color: #333;
`;

const NextButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #1b5cd7;
  }
`;

const HomeButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 600;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;
