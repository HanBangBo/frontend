import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const NavigationBar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const keyword = queryParams.get("keyword");

  let title = "";
  if (location.pathname.includes("quiz/select")) {
    title = source
      ? `${source} 문제`
      : keyword
      ? `${keyword} 문제`
      : "문제 선택";
  } else if (location.pathname.includes("quiz/practice")) {
    title = "연습 모드";
  }

  return (
    <NavBar>
      <NavTitle>{title}</NavTitle>
    </NavBar>
  );
};

export default NavigationBar;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const NavTitle = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;
