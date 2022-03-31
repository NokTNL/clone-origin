import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import dataLoader from "./scripts/dataLoader";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import LatestArtworks from "./components/LatestArtwork";

// Test
import Hero1 from "./components/Hero1";

const StyledApp = styled.div`
  /* To disable scrolling when collapsable menu is displaying */
  height: 100vh;
  overflow-x: hidden;
  overflow-y: ${({ isShowingMenu }) => (isShowingMenu ? "hidden" : "scroll")};
`;

function App() {
  const dispatch = useDispatch();
  const isDataLoaded = useSelector((state) => state.isDataLoaded);
  const [isShowingMenu, setIsShowingMenu] = useState(false);

  /* State initialisation code */
  useEffect(() => {
    // Load data for the whole page
    dataLoader();

    // Renew timeNow every second to mensure countdowns are working
    setInterval(() => {
      dispatch({ type: "tickTimer" });
    }, 1000);
  }, []);

  return (
    <StyledApp isShowingMenu={isShowingMenu} className="App">
      <NavBar
        isShowingMenu={isShowingMenu}
        setIsShowingMenu={setIsShowingMenu}
      />
      {isDataLoaded && (
        <>
          <Hero />
          <LatestArtworks />
          <Hero1 />
        </>
      )}
    </StyledApp>
  );
}

export default App;
