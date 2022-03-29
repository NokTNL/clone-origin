import styled from "styled-components";
import data from "../../scripts/dataStore";

import ArtworkInfo from "../ArtworkCard/ArtworkInfo";
import AuctionInfo from "../ArtworkCard/AuctionInfo";

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

export default function ArtworkCard({ index, targetData }) {
  const { artworkId, artworkName } = data[targetData][index].artworkInfo;

  return (
    <StyledArtworkCard>
      <ArtworkImg href={`https://knownorigin.io/gallery/${artworkId}`}>
        <img
          src={`https://cdn.knownorigin.io/cdn/images/network/1/edition/${artworkId}/card`}
          alt={artworkName}
          loading="lazy"
        />
      </ArtworkImg>
      <ArtworkInfo targetData={targetData} index={index} />
      <AuctionInfo targetData={targetData} index={index} />
    </StyledArtworkCard>
  );
}