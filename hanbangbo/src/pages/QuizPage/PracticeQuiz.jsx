import React, { useCallback, useEffect, useState } from "react"; // useEffect 추가
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { submitQuizAnswer } from "../../api/apiService";
import NavigationBar from "../../components/common/NavigationBar";

const PracticeQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL로 직접 접근했을 때 대비하여 기본값 설정
  const quizData = location.state?.quizData || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(""); // 사용자 응답
  const [result, setResult] = useState(null); // 정답 여부 결과
  const [quizResults, setQuizResults] = useState([]); // 정답 여부 저장 배열
  const [isLastSubmitted, setIsLastSubmitted] = useState(false); // 마지막 문제 제출 여부

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

  // 항상 useEffect를 호출해야 하므로, 조기 반환 없이 조건부 렌더링 처리
  useEffect(() => {
    console.log(quizResults);
    if (isLastSubmitted && quizResults.length > 0) {
      submitResults();
    }
  }, [isLastSubmitted, quizResults, submitResults]);

  // quizData가 없으면 에러 메시지 렌더링
  const renderContent = () => {
    if (quizData.length === 0) {
      return <p>❌ 문제가 없습니다.</p>;
    }

    const currentQuestion = quizData[currentIndex] || {};
    const isMultipleChoice = Array.isArray(currentQuestion.choices);
    const isLastQuestion = currentIndex === quizData.length - 1;

    return (
      <>
        <QuestionTitle>
          {currentQuestion.quiz_content || "문제가 없습니다."}
        </QuestionTitle>

        {/* 문제 풀이 단계 */}
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
            <CommentBox>
              {currentQuestion.quiz_comment || "해설이 없습니다."}
            </CommentBox>
          </>
        )}

        {/* 버튼 UI */}
        {!result ? (
          <SubmitButton onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
            제출하기
          </SubmitButton>
        ) : isLastQuestion ? (
          <HomeButton onClick={() => navigate("/")}>홈으로 가기</HomeButton>
        ) : (
          <NextButton onClick={handleNextQuestion}>다음 문제</NextButton>
        )}
      </>
    );
  };

  // 정답 제출 및 채점
  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) return;

    const currentQuestion = quizData[currentIndex] || {};
    const isCorrect = selectedAnswer === currentQuestion.correct;
    setResult(isCorrect ? "정답 ✅" : "오답 ❌");

    // 정답 여부 저장 (누적)
    setQuizResults((prev) => [
      ...prev,
      { quiz_id: currentQuestion.id, is_correct: isCorrect ? "True" : "False" },
    ]);

    // 마지막 문제이면 마지막 문제 제출 플래그 ON
    if (currentIndex === quizData.length - 1) {
      setIsLastSubmitted(true);
    }
  };

  // 다음 문제로 이동
  const handleNextQuestion = () => {
    setResult(null);
    setSelectedAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <Container>
      <NavigationBar />
      {renderContent()}
    </Container>
  );
};

export default PracticeQuiz;

/* 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 40px 40px;
`;

const QuestionTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 2rem;
  font-size: 24px;
  text-align: center;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
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
  width: 50%;
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
  margin-bottom: 1.5rem;
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
