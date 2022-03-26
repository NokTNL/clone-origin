import { useEffect, useState } from "react";
import styled from "styled-components";

import dataLoader from "./scripts/dataLoader";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import LatestArtworks from "./components/LatestArtworks";

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

      <h1>Header</h1>
      <h2>Header</h2>
      <h3>Header</h3>
      <h4>Header</h4>
      <h5>Header</h5>
      <h6>Header</h6>
      <div className="text-1">Text</div>
      <div className="text-2">Text</div>
      <div className="text-3">Text</div>
      <div className="text-4">Text</div>
      <div className="text-5">Text</div>
      <div className="text-6">Text</div>
      <div className="text-1">Text</div>
      <div className="text-2">Text</div>
      <div className="text-3">Text</div>
      <div className="text-4">Text</div>
      <div className="text-5">Text</div>
      <div className="text-6">Text</div>
      <div className="text-1">Text</div>
      <div className="text-2">Text</div>
      <div className="text-3">Text</div>
      <div className="text-4">Text</div>
      <div className="text-5">Text</div>
      <div className="text-6">Text</div>
    </StyledApp>
  );
}

export default App;
