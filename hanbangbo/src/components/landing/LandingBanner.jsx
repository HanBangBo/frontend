import React from "react";
import styled from "styled-components";

const LandingBanner = () => {
  return (
    <Banner>
      <h1>환영합니다! 🏆</h1>
      <p>한방보에서 실력을 키워보세요!</p>
      <StartButton>문제 풀기 시작하기</StartButton>
    </Banner>
  );
};

export default LandingBanner;

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 1200px; /* 크기가 줄어들지 않도록 최대 너비 제한 */
  height: 300px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  border-radius: 12px;
  padding: 40px 20px;
`;

const StartButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 18px;
  color: white;
  background-color: #ff6b6b;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #e63946;
  }
`;
