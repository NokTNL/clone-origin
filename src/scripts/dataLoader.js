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
import { GraphQLClient } from "graphql-request";

import gqlQueries from "./gqlQueries";
import fetchEndpoints from "./fetchEndpoints";
import store from "../store/mainStore";
import dataStore from "./dataStore";

// For testing if a string is a blockchain address:
const addrRegex = /^0x[0-9a-f]+$/i;

export default async function dataLoader() {
  // All primary GQL requests
  const gqlClient = new GraphQLClient(
    "https://api.thegraph.com/subgraphs/name/knownorigin/known-origin"
  );

  const gqlRequests = Object.keys(gqlQueries).map(
    // Each query creates a Promise to be resolved
    async (queryName) => {
      const { query, variables } = gqlQueries[queryName];

      let primaryResults = await gqlClient
        .request(query, variables) //
        .catch(() => {
          throw new Error(`GQL query for "${queryName}" failed`);
        });

      // Remove hierarchy
      const keyName = Object.keys(primaryResults)[0];
      primaryResults = primaryResults[keyName];
      // Extra requests: for fetching e.g. the bioOnlyReservePrice based on the data inside primaryResults
      // Each extra-request also creates a Promise to be resolved; only the extra requests are resolved, all GQL requests are resolved
      const extraRequests = await primaryResults.map(async (edition, index) => {
        // 1. Fetch "bidOnlyReservePrice" for each edition if it is a bit-only edition
        const { auctionEnabled: isBidOnly, id: artworkId } = edition;
        if (isBidOnly) {
          const extraResponse = await fetch(
            `https://us-central1-known-origin-io.cloudfunctions.net/main/api/network/1/reserve/edition/${artworkId}`
          );

          if (!extraResponse.ok) {
            throw new Error(
              `fetch "bidOnlyReservePrice" for ${queryName} edition ${index} failed`
            );
          }
          const extraResult = await extraResponse.json();

          edition.bidOnlyReservePrice = extraResult.eth_reserve_in_wei || "0";
        } else {
          edition.bidOnlyReservePrice = "0";
        }
        // returns these as the "value" of the individual extraEditionRequests promise
        return edition.bidOnlyReservePrice;
      });
      const extraRequestsResults = await Promise.all(extraRequests);

      // return these as the value of the gqlRequest promise
      return { queryName, queryType: "gql", result: primaryResults };
    }
  );

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
    ...gqlRequests,
    ...fetchRequests,
  ]) //
    .catch((err) => {
      alert("Something wrong with data fetching from server :(");
      throw new Error(err);
    });

  // For debugging
  // console.log(grandQueryResults);

  grandQueryResults.forEach((query) => {
    const { queryName, queryType, result } = query;

    switch (queryType) {
      // Not much data processing for fetch queries
      case "fetch":
        dataStore[queryName] = result;
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
        dataStore[queryName] = convertedQueryResult;
        break;

      default:
        throw new Error(`Unknown queryName ${queryName} in grandQueryResults`);
    }
  });

  // For debugging
  // console.log(dataStore);

  // Display the App once all data are loaded
  store.dispatch({ type: "CONFIRM_DATA_LOADED" });
}
