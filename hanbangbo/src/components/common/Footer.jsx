import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <FooterContainer>© 2025 한방보. All rights reserved.</FooterContainer>;
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 16px;
  background-color: #f8f9fa;
  margin-top: auto;
  font-size: 14px;
  color: #6c757d;
`;
