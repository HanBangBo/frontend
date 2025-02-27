import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const errorMessage =
    location.state?.errorMessage || "알 수 없는 오류가 발생했습니다.";

  return (
    <Container>
      <Title>⚠️ 오류 발생</Title>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Button onClick={() => navigate("/")}>홈으로 가기</Button>
    </Container>
  );
};

export default ErrorPage;

/* 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ff4d4f;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
  color: #555;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1b5cd7;
  }
`;
