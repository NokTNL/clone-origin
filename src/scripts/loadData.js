/* Note:
KnownOrigin has its own RESTful database for artists

URL:
https://us-central1-known-origin-io.cloudfunctions.net/main/api/

1. Twitter & Instagram
https://us-central1-known-origin-io.cloudfunctions.net/main/api/verification/user/{address}

2. List of editions and collections
https://us-central1-known-origin-io.cloudfunctions.net/main/api/network/1/collections/account/{address}?includePrivate=null&collectionType=edition


3. Minimum bid information
- Will only return useful stuff when there is a minimum bid value available
https://us-central1-known-origin-io.cloudfunctions.net/main/api/network/1/reserve/edition/{artworkId}
*/

import reduxStore from "../store/mainStore";
import fetchDataStore from "../store/fetchDataStore";
import queryGql from "./gql/queryGql";
import makeFetchQueries from "./fetch/makeFetchQueries";
import processOneQueryResult from "./processOneQueryResult";

export default async function loadData() {
  // The following request promises are created in one go:
  // 1. Create an array of GQL result PROMISES (no `await`)
  const gqlPromises = queryGql();
  // 2. Create an array of `fetch` result Promises
  const fetchPromises = makeFetchQueries();

  // Wait for all requests to be settled
  const grandQueryResults = await Promise.all([
    ...gqlPromises,
    ...fetchPromises,
  ]) //
    .catch((err) => {
      alert("Something wrong with data fetching from server :(");
      throw new Error(err);
    });

  // For debugging
  console.log(grandQueryResults);

  // Data processing & assigning to store
  grandQueryResults.forEach((query) => {
    processOneQueryResult(query);
  });

  // For debugging
  console.log(fetchDataStore);

  // Display the App once all data are loaded
  reduxStore.dispatch({ type: "CONFIRM_DATA_LOADED" });
}
