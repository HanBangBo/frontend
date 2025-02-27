import React from "react";
import styled from "styled-components";

const FeatureSection = () => {
  return (
    <Features>
      <Feature>
        <h3>📚 다양한 문제 유형</h3>
        <p>객관식, 주관식 문제를 자유롭게 풀어볼 수 있어요.</p>
      </Feature>
      <Feature>
        <h3>⏳ 실전 & 연습 모드</h3>
        <p>실전 모드에서 시험을 보거나, 연습 모드로 실력을 키울 수 있어요.</p>
      </Feature>
      <Feature>
        <h3>📊 성적 분석</h3>
        <p>문제 풀이 결과를 분석하여 성장할 수 있어요.</p>
      </Feature>
    </Features>
  );
};

export default FeatureSection;

const Features = styled.section`
  display: flex;
  justify-content: space-around; /* 요소 사이 균등한 간격 */
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  min-height: 400px;
  padding: 40px 20px;
  margin-top: 0 auto;
  flex-wrap: wrap; /* 반응형 대비 */
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  text-align: center;
  width: calc((100% - 40px) / 3); /* 3개 */
  padding: 40px 20px 20px 20px;
  border-radius: 12px;
  background-color: #f3f4f6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* padding 포함된 크기 조절 */

  h3 {
    margin-top: 10px;
    font-size: 1.5rem; /* ✅ 폰트 크기 조정 */
    font-weight: 600;
  }

  p {
    flex-grow: 1; /* ✅ 남은 공간을 차지하면서 중앙 정렬 */
    display: flex;
    align-items: center; /* ✅ 세로 중앙 정렬 */
    justify-content: center;
    font-size: 1.3rem;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    width: 100%; /* 작은 화면에서는 한 줄에 하나씩 표시 */
  }
`;
