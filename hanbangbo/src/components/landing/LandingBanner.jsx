import React from "react";
import styled from "styled-components";

const LandingBanner = () => {
  return (
    <Banner>
      <h1>환영합니다!</h1>
      <p>한방보에서 실력을 키워보세요!</p>
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
  min-height: 400px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  border-radius: 12px;
  padding: 40px 20px;

  h1 {
    font-size: 2.5rem; /* ✅ 폰트 크기 조정 */
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
  }
`;
