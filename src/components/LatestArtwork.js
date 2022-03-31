import styled from "styled-components";
import ArtworkCard from "./UI/ArtworkCard";

import MaxWidthContainer from "./UI/MaxWidthContainer";
import ArtworkGrid from "./UI/ArtworkGrid";

const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const Header = styled.h4`
  padding: 1rem 0;
`;

export default function LatestArtwork() {
  // Which group of data to retrieve info from dataStore.js
  const targetData = "latestArtwork";

  return (
    <section>
      <StyledMaxWidthContainer>
        <Header>Latest Artwork</Header>
        <ArtworkGrid>
          {[0, 1, 2].map((index) => (
            <ArtworkCard key={index} index={index} targetData={targetData} />
          ))}
        </ArtworkGrid>
      </StyledMaxWidthContainer>
    </section>
  );
}
