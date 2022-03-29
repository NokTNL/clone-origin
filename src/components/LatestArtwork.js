import styled from "styled-components";
import ArtworkCard from "./UI/ArtworkCard";

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
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
`;

export default function LatestArtwork() {
  // Which group of data to retrieve info from dataStore.js
  const targetData = "latestArtwork";

  return (
    <section>
      <StyledMaxWidthContainer>
        <Header>Latest Artwork</Header>
        <StyledMain>
          {[0, 1, 2].map((index) => (
            <ArtworkCard key={index} index={index} targetData={targetData} />
          ))}
        </StyledMain>
      </StyledMaxWidthContainer>
    </section>
  );
}
