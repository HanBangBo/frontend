import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <NavBar>
      <Button onClick={() => navigate(-1)}>← 뒤로 가기</Button>
      <Button onClick={() => navigate("/")}>Home</Button>
    </NavBar>
  );
};

export default NavigationBar;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #1a5ed8;
  }
`;
