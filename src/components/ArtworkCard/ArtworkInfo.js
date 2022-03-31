import styled from "styled-components";

import data from "../../store/fetchDataStore";

const StyledArtworkInfo = styled.header`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span:nth-of-type(1) {
    padding-left: 0.5rem;
  }
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

export default function ArtworkInfo({ index, targetData }) {
  const { artistName, artworkName, totalAvai, artistAddr, artworkId } =
    data[targetData][index].artworkInfo;

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
          />
        </Avatar>
        <span className="h5">{artistName}</span>
      </Artist>
    </StyledArtworkInfo>
  );
}
