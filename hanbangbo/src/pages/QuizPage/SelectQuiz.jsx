import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";

const SelectQuiz = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [quizType, setQuizType] = useState(""); // 객관식 / 주관식
  const [mode, setMode] = useState(""); // 연습모드 / 실전모드
  const [keyword, setKeyword] = useState(""); // 키워드

  // 시작 버튼이 활성화될 조건
  const isFormValid = quizType && mode && keyword;

  const handleStartQuiz = () => {
    if (mode === "practice") {
      navigate("/quiz/practice");
    } else if (mode === "test") {
      navigate("/quiz/test");
    }
  };

  return (
    <Container>
      <NavigationBar />
      <h1>퀴즈 모드 선택</h1>

      <Label>문제 유형</Label>
      <Select value={quizType} onChange={(e) => setQuizType(e.target.value)}>
        <option value="">선택하세요</option>
        <option value="multiple">객관식</option>
        <option value="subjective">주관식</option>
      </Select>

      <Label>퀴즈 모드</Label>
      <ButtonGroup>
        <ModeButton
          selected={mode === "practice"}
          onClick={() => setMode("practice")}
        >
          연습 모드
        </ModeButton>
        <ModeButton selected={mode === "test"} onClick={() => setMode("test")}>
          실전 모드
        </ModeButton>
      </ButtonGroup>

      <Label>키워드 선택</Label>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="예: 정치, 경제"
      />

      <StartButton onClick={handleStartQuiz} disabled={!isFormValid}>
        시작하기
      </StartButton>
    </Container>
  );
};

export default SelectQuiz;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-top: 15px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  margin-top: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ModeButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#2575fc" : "#f3f3f3")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: none;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #2575fc;
    color: white;
  }
`;

const StartButton = styled.button`
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
