import styled from "styled-components";

const ArtworkGrid = styled.main`
  display: grid;
  gap: 3rem 1.5rem;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  align-items: start;
`;

export default ArtworkGrid;
