import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const KeywordSelection = () => {
  const navigate = useNavigate();
  const keywords = ["정치", "경제", "사회", "국제", "문화", "과학"];

  return (
    <Section>
      <h2>🔍 키워드별 문제 풀기</h2>
      <KeywordGrid>
        {keywords.map((keyword) => (
          <KeywordButton
            key={keyword}
            onClick={() => navigate(`/quiz/select?keyword=${keyword}`)}
          >
            {keyword}
          </KeywordButton>
        ))}
      </KeywordGrid>
    </Section>
  );
};

export default KeywordSelection;

/* 스타일 */
const Section = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 40px;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const KeywordGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const KeywordButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background-color: #f3f3f3;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff6b6b;
    color: white;
  }
`;
