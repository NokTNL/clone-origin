import styled from "styled-components";
import { latestArtwork } from "../scripts/dataStore";

import ArtworkInfo from "./ArtworkCard/ArtworkInfo";

const StyledArtworkCard = styled.article`
  box-shadow: 0 0 33px 0 rgba(170, 170, 170, 0.5);
  transition: transform 0.7s;
  z-index: 0;

  &:hover {
    transform: translateY(-0.5rem);
  }
`;

const ArtworkImg = styled.a`
  display: block;

  & > img {
    height: 28rem;
    width: 100%;
    object-fit: cover;
  }
`;

const PriceInfo = styled.section``;

export default function ArtworkCard({ index }) {
  const { imgSrc, artworkId, artworkName } = latestArtwork[index];

  return (
    <StyledArtworkCard>
      <ArtworkImg href={`https://knownorigin.io/gallery/${artworkId}`}>
        <img src={imgSrc} alt={artworkName} loading="lazy" />
      </ArtworkImg>
      <ArtworkInfo index={index} />
      <PriceInfo />
    </StyledArtworkCard>
  );
}
