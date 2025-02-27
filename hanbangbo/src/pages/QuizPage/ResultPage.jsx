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

  // 문제 데이터 예시 (quiz_comment 추가)
  const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `문제 ${i + 1}: 이곳에 문제 내용이 들어갑니다.`,
    type: i % 2 === 0 ? "multiple" : "subjective",
    category: ["정치", "경제", "사회", "국제", "문화", "과학"][i % 6],
    correctAnswer: "정답 예시",
    quiz_comment: `문제 ${i + 1} 해설 예시`, // 해설 추가
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
      <TopNav>
        <NavHomeButton onClick={() => navigate("/")}>Home</NavHomeButton>
      </TopNav>

      <h1>결과 페이지</h1>
      <ScoreBox>
        <h2>총 {questions.length}문제 중</h2>
        <CorrectText>{correctAnswers.length}개 정답 ✅</CorrectText>
        <IncorrectText>{incorrectAnswers.length}개 오답 ❌</IncorrectText>
      </ScoreBox>

      <ChartContainer>
        <h3>틀린 문제 분석</h3>
        <Bar data={chartData} key={JSON.stringify(chartData)} />
      </ChartContainer>

      <IncorrectList>
        <QuestionTitle>
          <h3>틀린 문제 목록</h3>
        </QuestionTitle>
        {questions
          .map((q, index) =>
            answers[index] !== q.correctAnswer
              ? { ...q, userAnswer: answers[index] }
              : null
          )
          .filter(Boolean)
          .map((q) => (
            <QuestionItem key={q.id}>
              <QuestionTitleText>{q.question}</QuestionTitleText>
              <p>❌ 당신의 답변: {q.userAnswer}</p>
              <p>✅ 정답: {q.correctAnswer}</p>
              <p>해설: {q.quiz_comment}</p>
            </QuestionItem>
          ))}
      </IncorrectList>
    </Container>
  );
};

export default ResultPage;

/* 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px 20px;
`;

const TopNav = styled.nav`
  width: 100%;
  height: 75px;
  background-color: #283556;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const NavHomeButton = styled.button`
  font-size: 16px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ScoreBox = styled.div`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const CorrectText = styled.h3`
  color: green;
`;

const IncorrectText = styled.h3`
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
  margin-bottom: 40px; /* 여백 확장 */
  text-align: left;
`;

const QuestionItem = styled.div`
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  p {
    margin: 0.5rem 0; /* 각 줄 사이의 간격 확대 */
  }
`;

const QuestionTitle = styled.div`
  margin-bottom: 20px;
`;

const QuestionTitleText = styled.p`
  font-size: 20px; /* 문제 제목 글자 크기 확대 */
  font-weight: bold;
  margin-bottom: 12px; /* 제목과 다음 내용 사이 여백 */
`;
