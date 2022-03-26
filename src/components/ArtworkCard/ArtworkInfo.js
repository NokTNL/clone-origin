import styled from "styled-components";

import { latestArtwork } from "../../scripts/dataStore";

const StyledArtworkInfo = styled.header`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Artist = styled.a`
  align-self: start;

  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  & > span {
    padding-left: 0.5rem;
  }
`;

const Avatar = styled.figure`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  overflow: hidden;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;

export default function ArtworkInfo({ index }) {
  const { artistName, artworkName, totalAvai, artistAddr, artworkId } =
    latestArtwork[index];

  return (
    <StyledArtworkInfo>
      <Title>
        <a href={`https://knownorigin.io/gallery/${artworkId}`}>
          <span>{artworkName}</span>
        </a>
        <span className="bold text-7">1/{totalAvai}</span>
      </Title>
      <Artist href={`https://knownorigin.io/profile/${artistAddr}`}>
        <Avatar>
          <img
            src={`https://user-profile-images-cdn-bucket.storage.googleapis.com/${artistAddr}_avatar`}
            alt={artistName}
            loading="lazy"
          />
        </Avatar>
        <span className="h5">{artistName}</span>
      </Artist>
    </StyledArtworkInfo>
  );
}
