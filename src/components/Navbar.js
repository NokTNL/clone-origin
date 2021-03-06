import styled from "styled-components";

import Button from "./UI/Button";
import MainMenu from "./Navbar/MainMenu";
import CommunityMenu from "./Navbar/CommunityMenu";
import MaxWidthContainer from "./UI/MaxWidthContainer";
import FullWidthContainer from "./UI/FullWidthContainer";
import { breakpoint } from "./Navbar/variables";

const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 999;
`;
const StyledFullWidthContainer = styled(FullWidthContainer)`
  background-color: white;
`;

const StyledMaxWidthContainer = styled(MaxWidthContainer)`
  background-color: white;
  @media (min-width: ${breakpoint}) {
    display: flex;
  }
`;

const Container1 = styled.section`
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const Container2 = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  padding: 4rem 0 0 0.8rem;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  background-color: white;

  /* Transition on toggle */
  transform: translateX(
    ${({ isShowingMenu }) => (isShowingMenu ? 0 : "100vw")}
  );
  transition: transform 0.4s cubic-bezier(0.59, 0.04, 0.49, 0.95);

  @media (min-width: ${breakpoint}) {
    position: static;
    margin: 0;
    height: initial;
    /* To make the dropdown menu visible */
    overflow-y: visible;
    padding-top: 0;

    transition: none;
    transform: none;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const Brand = styled.a`
  padding: 0.8rem 0 0.8rem 0;

  @media (min-width: 768px) {
    h4,
    .h4 {
      font-size: 2rem;
    }
  }
`;

const ToggleMenuBotton = styled(Button)`
  @media (min-width: ${breakpoint}) {
    display: none;
  }
`;

const ConnectWalletButton = styled(Button)`
  margin: 1rem 0 1rem 0;
  align-self: center;

  @media (min-width: ${breakpoint}) {
    margin: 0 0 0 0.8rem;
  }
`;

export default function NavBar({ isShowingMenu, setIsShowingMenu }) {
  const handleToggleMenu = () => {
    setIsShowingMenu((prev) => !prev);
  };

  return (
    <StyledNav className="navbar">
      <StyledFullWidthContainer>
        <StyledMaxWidthContainer>
          <Container1>
            <Brand href="#">
              <h4>CloneOrigin.</h4>
            </Brand>
            <ToggleMenuBotton onClick={handleToggleMenu}>
              {isShowingMenu ? (
                <i className="bi bi-x-lg"></i>
              ) : (
                <i className="bi bi-list"></i>
              )}
            </ToggleMenuBotton>
          </Container1>

          <Container2 isShowingMenu={isShowingMenu}>
            <MainMenu />
            <CommunityMenu />
            <ConnectWalletButton color="primary">
              <span className="text-6 weight-400">Connect Wallet</span>
            </ConnectWalletButton>
          </Container2>
        </StyledMaxWidthContainer>
      </StyledFullWidthContainer>
    </StyledNav>
  );
}
