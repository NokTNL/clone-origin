import { useEffect } from "react";

import dataLoader from "./scripts/dataLoader";

import NavBar from "./components/Navbar";
import Button from "./components/UI/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // State initialisation code
  useEffect(() => {
    // dataLoader();
  }, []);

  return (
    <div className="App">
      <NavBar />
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
      <Button color="primary">
        <div className="text-6 weight-400">
          View <b>marketplace</b>
        </div>
      </Button>
      <Button color="white">
        <div className="text-6">Find out more</div>
      </Button>
      <Button>
        <div className="text-6">Find out more</div>
      </Button>
    </div>
  );
}

export default App;
