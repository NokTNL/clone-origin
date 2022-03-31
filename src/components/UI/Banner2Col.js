import styled from "styled-components";
import FullWidthContainer from "./FullWidthContainer";
import MaxWidthContainer from "./MaxWidthContainer";

const StyledFullWidthContainer = styled(FullWidthContainer)`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`;

const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  padding-top: 9rem;
  padding-bottom: 9rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Banner2ColTitle = styled.h2`
  font-size: 3rem;
`;

const Banner2ColBody = styled.div`
  display: flex;
  flex-direction: column;

  line-height: 2rem;
  gap: 1.5rem;
`;

export default function Banner2Col({ children, bgColor, textColor }) {
  return (
    <section>
      <StyledFullWidthContainer bgColor={bgColor} textColor={textColor}>
        <StyledMaxWidthContainer>{children}</StyledMaxWidthContainer>
      </StyledFullWidthContainer>
    </section>
  );
}

export { Banner2ColTitle, Banner2ColBody };
