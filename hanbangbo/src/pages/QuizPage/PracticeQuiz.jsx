import React, { useState } from "react";
import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";

const PracticeQuiz = () => {
  const questions = [
    {
      question: "React의 주된 특징은 무엇인가요?",
      options: [
        "단방향 데이터 흐름",
        "양방향 데이터 흐름",
        "비동기 처리",
        "UI 라이브러리",
      ],
      answer: 0, // 정답은 첫 번째 옵션
      explanation: "React는 단방향 데이터 흐름을 제공합니다.",
    },
    {
      question: "React에서 상태 관리 라이브러리로 많이 사용되는 것은?",
      options: ["Redux", "Vuex", "Context API", "Vue"],
      answer: 0, // 정답은 첫 번째 옵션
      explanation: "Redux는 React 상태 관리 라이브러리로 많이 사용됩니다.",
    },
    // 추가적인 문제들을 여기에 추가할 수 있음
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerSelection = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("퀴즈가 끝났습니다!");
      // 퀴즈 종료 후 처리
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container>
      <NavigationBar />
      <Question>{currentQuestion.question}</Question>
      <Options>
        {currentQuestion.options.map((option, index) => (
          <Option
            key={index}
            onClick={() => handleAnswerSelection(index)}
            selected={selectedAnswer === index}
          >
            {option}
          </Option>
        ))}
      </Options>

      <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
        답 제출
      </Button>

      {showAnswer && (
        <AnswerSection>
          <p>
            {selectedAnswer === currentQuestion.answer
              ? "정답!"
              : "틀렸습니다!"}
          </p>
          <Explanation>{currentQuestion.explanation}</Explanation>
          <Button onClick={handleNextQuestion}>다음 문제</Button>
        </AnswerSection>
      )}
    </Container>
  );
};

export default PracticeQuiz;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px 20px;
`;

const Question = styled.h2`
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.button`
  padding: 10px;
  width: 300px;
  font-size: 18px;
  text-align: left;
  background-color: ${(props) => (props.selected ? "#2575fc" : "#f3f3f3")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2575fc;
    color: white;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 18px;
  color: white;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ff6b6b")};
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#e63946")};
  }
`;

const AnswerSection = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Explanation = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #555;
`;
