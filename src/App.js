import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import loadData from "./scripts/loadData";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import LatestArtworks from "./components/LatestArtwork";
import DynamicBanner from "./components/DynamicBanner";
import StaticBanner2Col from "./components/StaticBanner2Col";
import ScheduledEditions from "./components/ScheduledEditions";
import ReserveAuctions from "./components/ReserveAuctions";

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
    loadData();

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
      {isDataLoaded /* true */ && (
        <>
          <Hero />
          <LatestArtworks />
          <DynamicBanner index={0} />
          <ScheduledEditions />
          <DynamicBanner index={1} />
          <ReserveAuctions />
          <StaticBanner2Col index={0} />
          <DynamicBanner index={2} />
          <StaticBanner2Col index={1} />
          <StaticBanner2Col index={2} />
        </>
      )}
    </StyledApp>
  );
}

export default App;
