import React from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import FeatureSection from "../components/landing/FeatureSection";
import LandingBanner from "../components/landing/LandingBanner";

const LandingPage = () => {
  return (
    <Container>
      <Header />
      <Main>
        <ContentWrapper>
          <LandingBanner />
          <FeatureSection />
        </ContentWrapper>
      </Main>
      <Footer />
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 20px;
  margin: 30px 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center; /* 중앙 정렬 */
  gap: 40px;
`;
