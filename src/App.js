import { useEffect, useState } from "react";
import styled from "styled-components";

import dataLoader from "./scripts/dataLoader";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";

const StyledApp = styled.div`
  height: 100vh;
  overflow: ${({ isShowingMenu }) => (isShowingMenu ? "hidden" : "scroll")};
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
