import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>한방보 | 한 방에 보는 언론고사</Logo>
        <NavLinks>
          <StyledLink to="/">홈</StyledLink>
          <StyledLink to="/quiz/select">문제 풀기</StyledLink>
          <StyledLink to="/login">로그인</StyledLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #343a40;
  color: white;
  padding: 16px 0; /* 위아래 여백 추가 */
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* 가로 폭 제한 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0 20px; /* 좌우 여백 추가 */
`;

const Logo = styled.h2`
  font-size: 24px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
