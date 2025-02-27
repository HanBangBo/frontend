import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchQuestions } from "../../api/apiService";
import NavigationBar from "../../components/common/NavigationBar";

const SelectQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const keyword = queryParams.get("keyword");

  const [quizTypes, setQuizTypes] = useState([]);
  const [mode, setMode] = useState("");
  const [startPeriod, setStartPeriod] = useState("");
  const [endPeriod, setEndPeriod] = useState("");

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  let sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const minYear = sixMonthsAgo.getFullYear();
  const minMonth = sixMonthsAgo.getMonth() + 1; // ✅ (1월 = 0이므로 +1)

  const periods = [];
  for (let year = currentYear; year >= minYear; year--) {
    for (
      let month = year === currentYear ? currentMonth : 12;
      month >= (year === minYear ? minMonth : 1);
      month--
    ) {
      const formattedMonth = month < 10 ? `0${month}` : month; // ✅ 01, 02 형식 유지
      periods.push({
        value: `${year}-${formattedMonth}`,
        label: `${year}년 ${month}월`,
      });
    }
  }

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

  const isFormValid = quizTypes.length > 0 && mode && startPeriod && endPeriod;

  const handleStartQuiz = async () => {
    try {
      const response = await fetchQuestions(
        quizTypes,
        source ? source : keyword,
        startPeriod,
        endPeriod
      );
      console.log("📌 문제 데이터:", response);
      if (mode === "practice") {
        navigate("/quiz/practice", { state: { quizData: response.quiz_data } });
      } else if (mode === "test") {
        navigate("/quiz/test", { state: { quizData: response.quiz_data } });
      }
    } catch (error) {
      console.error("❌ 문제 요청 중 오류 발생:", error);
      navigate("/error", {
        state: {
          errorMessage:
            error.response?.data?.message ||
            "문제 데이터를 불러오는 중 오류가 발생했습니다.",
        }
      });
    }
  };

  const toggleQuizType = (type) => {
    setQuizTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <Container>
      <NavigationBar />
      <FullHeightContainer>
        <SelectionContainer>
          {/* 문제 유형 */}
          <SelectionBlock>
            <Label>문제 유형</Label>
            <ButtonGroup>
              <ModeButton
                selected={quizTypes.includes("객관식")}
                onClick={() => toggleQuizType("객관식")}
              >
                객관식
              </ModeButton>
              <ModeButton
                selected={quizTypes.includes("주관식")}
                onClick={() => toggleQuizType("주관식")}
              >
                주관식
              </ModeButton>
            </ButtonGroup>
          </SelectionBlock>

          {/* 세로 구분선 */}
          <Divider />

          {/* 퀴즈 모드 */}
          <SelectionBlock>
            <Label>퀴즈 모드</Label>
            <ButtonGroup>
              <ModeButton
                selected={mode === "practice"}
                onClick={() => setMode("practice")}
              >
                연습 모드
              </ModeButton>
              <ModeButton
                selected={mode === "test"}
                onClick={() => setMode("test")}
              >
                실전 모드
              </ModeButton>
            </ButtonGroup>
          </SelectionBlock>

          {/* 세로 구분선 */}
          <Divider />

          {/* 기간 선택 */}
          <SelectionBlock>
            <Label>기간 선택</Label>
            <DateSelection>
              <Select
                value={startPeriod}
                onChange={(e) => setStartPeriod(e.target.value)}
              >
                <option value="">시작 기간</option>
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
                <option value="">종료 기간</option>
                {filteredEndPeriods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </Select>
            </DateSelection>
          </SelectionBlock>
        </SelectionContainer>

        <StartButton onClick={handleStartQuiz} disabled={!isFormValid}>
          시작하기
        </StartButton>
      </FullHeightContainer>
    </Container>
  );
};

export default SelectQuiz;

/* ✅ 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const FullHeightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* ✅ 전체 페이지 중앙 정렬 */
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
`;

const SelectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* ✅ 3개 영역 균등 배치 */
  width: 100%;
  height: 250px;
  max-width: 900px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SelectionBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Divider = styled.div`
  width: 1px;
  height: 100px;
  background: #ccc;
  margin: 0 15px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModeButton = styled.button`
  width: 100%;
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

const DateSelection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
`;

const StartButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 600;
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
