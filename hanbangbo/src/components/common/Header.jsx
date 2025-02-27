import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>한방보 | 한 방에 보는 언론고사</Logo>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: #343a40;
  color: white;
  padding: 16px 0; /* 위아래 여백 추가 */
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px; /* 가로 폭 제한 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0 20px; /* 좌우 여백 추가 */
`;

const Logo = styled.h2`
  font-size: 24px;
`;
