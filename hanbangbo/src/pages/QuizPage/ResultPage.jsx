import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || { answers: [] };

  // 문제 데이터 예시
  const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `문제 ${i + 1}: 이곳에 문제 내용이 들어갑니다.`,
    type: i % 2 === 0 ? "multiple" : "subjective",
    category: ["정치", "경제", "사회", "국제", "문화", "과학"][i % 6], // 랜덤한 분야
    correctAnswer: "정답 예시",
  }));

  // 맞춘 문제 & 틀린 문제 계산
  const correctAnswers = answers.filter(
    (ans, index) => ans === questions[index].correctAnswer
  );
  const incorrectAnswers = answers.filter(
    (ans, index) => ans !== questions[index].correctAnswer
  );

  // 분야별 틀린 문제 개수 계산
  const incorrectByCategory = {};
  questions.forEach((q, index) => {
    if (answers[index] !== q.correctAnswer) {
      incorrectByCategory[q.category] =
        (incorrectByCategory[q.category] || 0) + 1;
    }
  });

  // 차트 데이터 준비
  const chartData = {
    labels: Object.keys(incorrectByCategory),
    datasets: [
      {
        label: "틀린 문제 수",
        data: Object.values(incorrectByCategory),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <Container>
      {/* ✅ 좌측 상단에 고정된 홈으로 가기 버튼 */}
      <HomeButton onClick={() => navigate("/")}>Home</HomeButton>

      <h1>결과 페이지</h1>
      <ScoreBox>
        <h2>총 {questions.length}문제 중</h2>
        <CorrectText>{correctAnswers.length}개 정답 ✅</CorrectText>
        <IncorrectText>{incorrectAnswers.length}개 오답 ❌</IncorrectText>
      </ScoreBox>

      {/* 분야별 틀린 문제 차트 */}
      <ChartContainer>
        <h3>틀린 문제 분석</h3>
        <Bar data={chartData} key={JSON.stringify(chartData)} />
      </ChartContainer>

      {/* 틀린 문제 리스트 */}
      <IncorrectList>
        <h3>틀린 문제 목록</h3>
        {questions
          .map((q, index) =>
            answers[index] !== q.correctAnswer
              ? { ...q, userAnswer: answers[index] }
              : null
          )
          .filter(Boolean)
          .map((q) => (
            <QuestionItem key={q.id}>
              <p>
                <strong>{q.question}</strong>
              </p>
              <p>❌ 당신의 답변: {q.userAnswer}</p>
              <p>✅ 정답: {q.correctAnswer}</p>
            </QuestionItem>
          ))}
      </IncorrectList>

      {/* 버튼 영역 */}
      <ButtonContainer>
        <RetryButton onClick={() => navigate("/test")}>
          다시 도전하기
        </RetryButton>
      </ButtonContainer>
    </Container>
  );
};

export default ResultPage;

/* 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

/* ✅ 홈으로 가기 버튼을 좌측 상단에 고정 */
const HomeButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 16px;
  font-size: 16px;
  background: #2575fc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background: #1a5ed8;
  }
`;

const ScoreBox = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const CorrectText = styled.h2`
  color: green;
`;

const IncorrectText = styled.h2`
  color: red;
`;

const ChartContainer = styled.div`
  width: 500px;
  height: 300px;
  margin-bottom: 30px;
`;

const IncorrectList = styled.div`
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
  text-align: left;
`;

const QuestionItem = styled.div`
  background: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const RetryButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #388e3c;
  }
`;
