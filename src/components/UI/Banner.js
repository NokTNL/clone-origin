import styled from "styled-components";
import MaxWidthContainer from "./MaxWidthContainer";

const ImgContainer = styled.div`
  height: 650px;
  width: 100vw;
  padding: 5rem 0rem;
  background-image: url(${({ url }) => url});
  background-size: cover;
  /* Add a shadow filter */
  box-shadow: inset 100vw 650px rgba(0, 0, 0, 0.3);
`;

const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  @media (min-width: 768px) and (max-width: 1000px) {
    padding: 0 3rem;
  }
`;

const BannerTitle = styled.h1`
  color: white;

  @media (min-width: 1000px) {
    width: 60%;
  }
`;

const BannerBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  gap: 1.5rem;
`;

const BannerContent = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: white;
`;

const Banner = ({ children, imgUrl }) => {
  return (
    <ImgContainer url={imgUrl}>
      <StyledMaxWidthContainer>{children}</StyledMaxWidthContainer>
    </ImgContainer>
  );
};

export default Banner;
export { BannerTitle, BannerContent, BannerBody };
