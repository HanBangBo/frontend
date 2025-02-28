import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NewsCategoryBar from "./\bNewsCategoryBar";

const newsSources = [
  { name: "한국경제", image: "/한국경제.webp" },
  { name: "헤럴드경제", image: "/헤럴드.png" },
  { name: "한겨레", image: "/한겨레.jpg" },
  { name: "매일경제", image: "/매일경제.jpg" },
  { name: "조선일보", image: "/조선일보.webp" },
  { name: "서울신문", image: "/서울신문.jpeg" },
  { name: "동아일보", image: "/동아일보.jpg" },
  { name: "경향신문", image: "/경향신문.jpg" },
  { name: "한국일보", image: "/한국일보.jpg" },
  { name: "세계일보", image: "/세계일보.jpg" },
];

// 인기순위 3개 선정
const topNews = newsSources.slice(0, 3);
// 나머지 주요 언론사 목록
const mainNews = newsSources.slice(3);

const NewsSelection = () => {
  const navigate = useNavigate();

  return (
    <Container>
      {/* 1️⃣ 전체 언론사 배너 */}
      <NewsCategoryBar />

      {/* 2️⃣ 인기 언론사 TOP 3 */}
      <PopularNewsSection>
        <h2>🔥 인기 언론사</h2>
        <TopNewsGrid>
          {topNews.map((source, index) => (
            <TopNewsCard
              key={source.name}
              onClick={() => navigate(`/quiz/select?source=${source.name}`)}
              bgImage={source.image}
            >
              <Rank>{index + 1}</Rank>
              <NewsLabel>{source.name} 바로가기</NewsLabel>
            </TopNewsCard>
          ))}
        </TopNewsGrid>
      </PopularNewsSection>

      {/* 3️⃣ 주요 언론사 목록 */}
      <MainNewsSection>
        <MainNewsGrid>
          {mainNews.map((source) => (
            <MainNewsCard
              key={source.name}
              onClick={() => navigate(`/quiz/select?source=${source.name}`)}
              bgImage={source.image}
            ></MainNewsCard>
          ))}
        </MainNewsGrid>
      </MainNewsSection>
    </Container>
  );
};

export default NewsSelection;

/* 스타일 */
const Container = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 40px;
`;

/* 2️⃣ 인기 언론사 TOP 3 스타일 */
const PopularNewsSection = styled.div`
  margin-top: 40px;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const TopNewsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const TopNewsCard = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  background: url(${(props) => props.bgImage}) no-repeat center;
  background-size: contain;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
`;

const Rank = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  font-weight: 700;
  color: black;
`;

const NewsLabel = styled.div`
  background-color: black;
  color: white;
  width: 80%;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

/* 3️⃣ 주요 언론사 목록 스타일 */
const MainNewsSection = styled.div`
  margin-top: 40px;
`;

const MainNewsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const MainNewsCard = styled.div`
  width: 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  background: url(${(props) => props.bgImage}) no-repeat center;
  background-size: contain;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;
