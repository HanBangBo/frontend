import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const allNewsSources = [
  "한겨레",
  "중앙일보",
  "한국경제",
  "매일경제",
  "조선일보",
  "서울신문",
  "동아일보",
  "경향신문",
  "한국일보",
  "세계일보",
];

const topNewsSources = allNewsSources.slice(0, 5); // 상위 5개 언론사
const remainingNewsSources = allNewsSources.slice(5); // 나머지 전체 언론사

const NewsCategoryBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 언론사 클릭 시 SelectQuiz 페이지로 이동
  const handleNewsClick = (source) => {
    navigate(`/quiz/select?source=${source}`);
  };

  return (
    <Container
      isDropdownOpen={isDropdownOpen} // ✅ border-radius 동적 적용
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      {/* 전체 언론사 버튼 */}
      <CategoryTitle>전체 언론사</CategoryTitle>

      {/* 상위 5개 언론사 (양쪽 끝 정렬) */}
      <TopNewsContainer>
        {topNewsSources.map((source) => (
          <TopNewsItem key={source} onClick={() => handleNewsClick(source)}>
            {source}
          </TopNewsItem>
        ))}
      </TopNewsContainer>

      {/* 드롭다운 - 배너 전체에서 마우스 인식 + 드롭다운 위에서는 유지 */}
      {isDropdownOpen && (
        <DropdownContainer>
          {remainingNewsSources.map((source) => (
            <DropdownItem key={source} onClick={() => handleNewsClick(source)}>
              {source}
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}
    </Container>
  );
};

export default NewsCategoryBar;

/* 스타일 */
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 5개 언론사 좌우 정렬 */
  width: 100%;
  max-width: 1200px;
  height: 75px;
  background-color: #222; /* 배경색 */
  color: white;
  border-radius: ${(props) =>
    props.isDropdownOpen ? "20px 20px 0 0" : "20px"}; /* 동적 변경 */
  padding: 15px 25px;
  position: relative;
  cursor: pointer;
  transition: border-radius 0.2s ease; /* 부드러운 전환 */
`;

const CategoryTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-right: 100px;
`;

const TopNewsContainer = styled.div`
  display: flex;
  gap: 20px; /* ✅ 언론사 간격 균등 조정 */
  flex-grow: 1;
  justify-content: space-between;
`;

const TopNewsItem = styled.div`
  font-size: 1.2rem;
  color: #ddd; /* ✅ 글자 색 변경 */
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

/* 드롭다운 */
const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 15px 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 0; /* ✅ 위/아래 모두 직선 유지 */
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3); /* ✅ 깔끔한 드롭다운 */
`;

const DropdownItem = styled.div`
  font-size: 1rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;
