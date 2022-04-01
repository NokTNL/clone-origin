import styled from "styled-components";

import MaxWidthContainer from "./MaxWidthContainer";

const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const SectionHeader = styled.h3`
  padding: 1rem 0;
`;

const SectionFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

export { SectionHeader, SectionFooter };

export default function Section({ children, ...attrs }) {
  return (
    <section {...attrs}>
      <StyledMaxWidthContainer>{children}</StyledMaxWidthContainer>
    </section>
  );
}
