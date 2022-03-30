import styled from "styled-components";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

  & * {
    width: 100%;
  }

  & img {
    height: 28rem;
    width: 100%;
    object-fit: cover;
  }
  /* Fade-in image on lazy-load */
  & img[data-loaded="true"] {
    animation: fade-in 1 2s forwards ease-out;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default function ArtworkCard({ index, targetData }) {
  const { artworkId, artworkName } = data[targetData][index].artworkInfo;

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const handleImgLoaded = () => {
    setIsImgLoaded(true);
  };

  return (
    <StyledArtworkCard>
      <ArtworkImg href={`https://knownorigin.io/gallery/${artworkId}`}>
        <LazyLoadImage
          data-loaded={isImgLoaded}
          alt={artworkName}
          afterLoad={handleImgLoaded}
          src={`https://cdn.knownorigin.io/cdn/images/network/1/edition/${artworkId}/card`}
        />
        {/* <img
          src={`https://cdn.knownorigin.io/cdn/images/network/1/edition/${artworkId}/card`}
          alt={artworkName}
          loading="lazy"
        /> */}
      </ArtworkImg>
      <ArtworkInfo targetData={targetData} index={index} />
      <AuctionInfo targetData={targetData} index={index} />
    </StyledArtworkCard>
  );
}
