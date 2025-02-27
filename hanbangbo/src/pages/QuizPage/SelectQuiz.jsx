import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";

const SelectQuiz = () => {
  const navigate = useNavigate();
  // 키워드 리스트
  const keywords = ["정치", "경제", "사회", "국제", "문화", "과학"];

  const [quizType, setQuizType] = useState(""); // 문제 유형
  const [mode, setMode] = useState(""); // 퀴즈 모드
  const [keyword, setKeyword] = useState(""); // 키워드
  const [startPeriod, setStartPeriod] = useState(""); // 시작 기간 (YYYY-MM)
  const [endPeriod, setEndPeriod] = useState(""); // 종료 기간 (YYYY-MM)

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1월 = 0

  const periods = [];
  for (let year = currentYear; year >= currentYear - 1; year--) {
    for (
      let month = year === currentYear ? currentMonth : 12;
      month >= 1;
      month--
    ) {
      const formattedMonth = month < 10 ? `0${month}` : month; // 01, 02 형식 유지
      periods.push({
        value: `${year}-${formattedMonth}`,
        label: `${year}년 ${month}월`,
      });
    }
  }

  // 종료 기간 옵션 필터링 (startPeriod 이후의 기간만 표시 & 현재 연도 월까지만 선택 가능)
  const filteredEndPeriods = startPeriod
    ? periods.filter(
        (p) =>
          p.value >= startPeriod &&
          p.value <=
            `${currentYear}-${
              currentMonth < 10 ? `0${currentMonth}` : currentMonth
            }`
      )
    : periods;

  const isFormValid = quizType && mode && keyword && startPeriod && endPeriod;

  const handleStartQuiz = () => {
    if (mode === "practice") {
      navigate("/quiz/practice");
    } else if (mode === "test") {
      navigate("/quiz/test");
    }
  };

  // 키워드 선택 핸들러
  const handleKeywordClick = (selectedKeyword) => {
    setKeyword(selectedKeyword === keyword ? "" : selectedKeyword); // 같은 버튼 클릭 시 선택 해제
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
      <KeywordContainer>
        {keywords.map((item) => (
          <KeywordButton
            key={item}
            selected={keyword === item}
            onClick={() => handleKeywordClick(item)}
          >
            {item}
          </KeywordButton>
        ))}
      </KeywordContainer>

      <Label>기간 선택</Label>
      <DateSelection>
        <Select
          value={startPeriod}
          onChange={(e) => setStartPeriod(e.target.value)}
        >
          <option value="">시작 기간 선택</option>
          {periods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </Select>
        <span>~</span>
        <Select
          value={endPeriod}
          onChange={(e) => setEndPeriod(e.target.value)}
          disabled={!startPeriod}
        >
          <option value="">종료 기간 선택</option>
          {filteredEndPeriods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </Select>
      </DateSelection>

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
  padding: 0 20px 20px 20px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-top: 15px;
`;

const Select = styled.select`
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

const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const KeywordButton = styled.button`
  flex: 1;
  min-width: 80px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#ff6b6b" : "#f3f3f3")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: none;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #ff6b6b;
    color: white;
  }
`;

const DateSelection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
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
