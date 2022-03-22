import Header from "./components/Header";
import Footer from "./components/Footer";

import { GraphQLClient, gql } from "graphql-request";
import { useEffect } from "react";

/* Note:
KnownOrigin has its own RESTful database for artists

URL:
https://us-central1-known-origin-io.cloudfunctions.net/main/api/

1. Twitter & Instagram
https://us-central1-known-origin-io.cloudfunctions.net/main/api/verification/user/{address}

2. List of editions and collections
https://us-central1-known-origin-io.cloudfunctions.net/main/api/network/1/collections/account/{address}?includePrivate=null&collectionType=edition

*/

function App() {
  useEffect(() => {
    (async () => {
      // This will get latest 4 editions
      const query = gql`
        {
          editions(first: 4, orderBy: createdTimestamp, orderDirection: desc) {
            id
            createdTimestamp
            tokenIds
            artistAccount
            priceInWei
            totalSupply
            active
            metadata {
              id
              name
              description
              artist
              scarcity
              tags
            }
          }
        }
      `;
      const client = new GraphQLClient(
        "https://api.thegraph.com/subgraphs/name/knownorigin/known-origin"
      );
      const data = await client.request(query);
      console.log(data);
    })();
  }, []);

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
