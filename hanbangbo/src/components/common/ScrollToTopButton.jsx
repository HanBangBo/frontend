import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa"; // 아이콘 사용
import styled from "styled-components";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 최상단으로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ScrollButton onClick={scrollToTop} isVisible={isVisible}>
      <FaArrowUp />
    </ScrollButton>
  );
};

export default ScrollToTopButton;

/* 스타일 */
const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 50%;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  &:hover {
    background-color: #1a5ed8;
  }
`;
