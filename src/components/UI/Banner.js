import styled from "styled-components";
import { useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import MaxWidthContainer from "./MaxWidthContainer";

const ImgContainer = styled.div`
  height: 650px;
  padding: 5rem 0rem;
  background-image: url(${({ url }) => url});
  background-size: cover;
  /* Add a shadow filter */
  box-shadow: inset 100vw 650px rgba(0, 0, 0, 0.3);

  /* Fade-in on lazy-load */
  &[data-loaded="true"] {
    animation: test 3s forwards;

    @keyframes test {
      from {
        opacity: 0%;
      }
      to {
        opacity: 100%;
      }
    }
  }
`;

const PlaceHolderContainer = styled(ImgContainer)`
  background-image: none;
  box-shadow: none;
`;

const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  @media (min-width: 768px) and (max-width: 1000px) {
    padding: 0 3rem;
  }
`;

const BannerTitle = styled.h1`
  color: white;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }

  @media (min-width: 1000px) {
    width: 70%;
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
  const [isCompLoaded, setIsCompLoaded] = useState(false);

  const handleCompLoaded = () => {
    setIsCompLoaded(true);
  };

  return (
    <LazyLoadComponent
      afterLoad={handleCompLoaded}
      // placeholder is needed to make sure the page does not collapse before loading
      placeholder={<PlaceHolderContainer />}
    >
      <ImgContainer url={imgUrl} data-loaded={isCompLoaded}>
        <StyledMaxWidthContainer>{children}</StyledMaxWidthContainer>
      </ImgContainer>
    </LazyLoadComponent>
  );
};

export default Banner;
export { BannerTitle, BannerContent, BannerBody };
