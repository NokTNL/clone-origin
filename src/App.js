import { useEffect, useState } from "react";
import styled from "styled-components";

import dataLoader from "./scripts/dataLoader";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import LatestArtworks from "./components/LatestArtwork";

const StyledApp = styled.div`
  /* To disable scrolling when collapsable menu is displaying */
  height: 100vh;
  overflow-x: hidden;
  overflow-y: ${({ isShowingMenu }) => (isShowingMenu ? "hidden" : "scroll")};
`;

function App() {
  // State initialisation code
  useEffect(() => {
    // dataLoader();
  }, []);

  const [isShowingMenu, setIsShowingMenu] = useState(false);

  return (
    <StyledApp isShowingMenu={isShowingMenu} className="App">
      <NavBar
        isShowingMenu={isShowingMenu}
        setIsShowingMenu={setIsShowingMenu}
      />
      <Hero />
      <LatestArtworks />
    </StyledApp>
  );
}

export default App;
