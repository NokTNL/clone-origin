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

import fetchEndpoints from "./fetchEndpoints";
import reduxStore from "../store/mainStore";
import fetchDataStore from "../store/fetchDataStore";
import queryGql from "./gql/queryGql";

export default async function loadData() {
  // The following request promises are created in one go:
  // 1. Create an array of GQL result PROMISES (no `await`)
  const gqlPromises = queryGql();
  console.log(gqlPromises);
  // All primary fetch requests
  const fetchRequests = Object.keys(fetchEndpoints).map(
    // Each endpoint produces a Promise
    async (endpoint) => {
      const response = await fetch(fetchEndpoints[endpoint]);
      if (!response.ok) {
        throw new Error(`fetch "${endpoint}" failed`);
      }
      let result = await response.json();
      // Remove data hierarchy
      const keyName = Object.keys(result)[0];
      result = result[keyName];

      return {
        queryName: endpoint,
        queryType: "fetch",
        result,
      };
    }
  );

  // Once all requests are settled
  const grandQueryResults = await Promise.all([
    ...gqlPromises,
    ...fetchRequests,
  ]) //
    .catch((err) => {
      alert("Something wrong with data fetching from server :(");
      throw new Error(err);
    });

  // For debugging
  console.log(grandQueryResults);

  grandQueryResults.forEach((query) => {
    const { queryName, queryType, result } = query;

    switch (queryType) {
      // Not much data processing for fetch queries
      case "fetch":
        fetchDataStore[queryName] = result;
        break;
      // Data processing for each GQL query
      case "gql":
        const convertedQueryResult = result.map((edition) => {
          // 1. Data extraction & restructuring for each edition
          const {
            id: artworkId,
            artistAccount: artistAddr,
            metadata: { name: artworkName, artist: artistName },
            auctionEnabled: isBidOnly,
            bidOnlyReservePrice,
            metadataPrice,
            reservePrice,
            totalAvailable: totalAvai,
            startDate: startTime,
            stepSaleStepPrice: priceStep,
            reserveAuctionStartDate: reserveAuctionStartTime,
            reserveAuctionEndTimestamp: reserveAuctionEndTime,
            reserveAuctionBid,
          } = edition;

          const outputEdition = {
            artworkInfo: {
              artworkName,
              artworkId,
              artistName,
              artistAddr,
              totalAvai,
            },
            auctionInfo: {
              isBidOnly,
              bidOnlyReservePrice,
              reservePrice,
              metadataPrice,
              startTime,
              priceStep,
              reserveAuctionStartTime,
              reserveAuctionEndTime,
              reserveAuctionBid,
            },
          };

          // 2. Convert all string-notated numbers into real numbers
          // For testing if a string is a blockchain address:
          const addrRegex = /^0x[0-9a-f]+$/i;

          for (const property in outputEdition) {
            for (const subProperty in outputEdition[property]) {
              const testValue = outputEdition[property][subProperty];
              const isAddr = addrRegex.test(testValue);
              const isNumber = testValue === "0" || parseInt(testValue);
              // Only convert strings that are numbers but not blockchain addresses ("0xXXXXX")
              if (!isAddr && isNumber) {
                outputEdition[property][subProperty] = parseInt(testValue);
              }
            }
          }
          // return converted edition in convertedQueryResult
          return outputEdition;
        });
        // Assign to dataStore.js after finishing data converion in that query
        fetchDataStore[queryName] = convertedQueryResult;
        break;

      default:
        throw new Error(`Unknown queryName ${queryName} in grandQueryResults`);
    }
  });

  // For debugging
  console.log(fetchDataStore);

  // Display the App once all data are loaded
  reduxStore.dispatch({ type: "CONFIRM_DATA_LOADED" });
}
