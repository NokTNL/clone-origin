import styled from "styled-components";
import ArtworkCard from "./ArtworkCard";

import MaxWidthContainer from "./UI/MaxWidthContainer";

const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const Header = styled.h4`
  padding: 1rem 0;
`;

const StyledMain = styled.main`
  display: grid;
  gap: 3rem 1.5rem;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export default function LatestArtwork() {
  return (
    <section>
      <StyledMaxWidthContainer>
        <Header>Latest Artwork</Header>
        <StyledMain>
          {[0, 1, 2].map((index) => (
            <ArtworkCard index={index} key={index} />
          ))}
        </StyledMain>
      </StyledMaxWidthContainer>
    </section>
  );
}
