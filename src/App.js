import Header from "./components/Header";
import Footer from "./components/Footer";

import dataLoader from "./scripts/dataLoader";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    dataLoader();
    /* const fetchResponse = await fetch(
        "https://api.thegraph.com/subgraphs/name/knownorigin/known-origin",
        {
          method: "POST",
          body: JSON.stringify({
            query: reserveAuctionsEndingSoonQuery,
            variables: { timestamp: "1647942985" },
          }),
        }
      );
      const fetchData = await fetchResponse.json();
      console.log(fetchData); */
  }, []);

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
