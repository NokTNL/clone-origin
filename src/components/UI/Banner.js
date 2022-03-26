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

const BannerTitle = styled.h1`
  color: white;
`;

const BannerBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  gap: 1.5rem;
`;

const BannerContent = styled.div`
  font-size: 1rem;
  color: white;
`;

const Banner = ({ children, imgUrl }) => {
  return (
    <ImgContainer url={imgUrl}>
      <MaxWidthContainer>{children}</MaxWidthContainer>
    </ImgContainer>
  );
};

export default Banner;
export { BannerTitle, BannerContent, BannerBody };
