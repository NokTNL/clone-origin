import styled from "styled-components";

const MaxWidthContainer = styled.div`
  margin-left: auto;
  margin-right: auto;

  padding: 0 1.5rem;

  @media (min-width: 1000px) {
    max-width: 1600px;
    padding: 0 5rem;
  }
`;

export default MaxWidthContainer;
