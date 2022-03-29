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

import gqlQueries from "./gqlQueries";
import fetchEndpoints from "./fetchEndpoints";

import { GraphQLClient } from "graphql-request";

export default async function dataLoader() {
  const gqlClient = new GraphQLClient(
    "https://api.thegraph.com/subgraphs/name/knownorigin/known-origin"
  );

  const gqlPromises = Object.keys(gqlQueries).map(async (queryName) => ({
    queryName,
    result: await gqlClient
      .request(gqlQueries[queryName].query, gqlQueries[queryName].variables)
      .catch((err) => {
        throw new Error(`GQL query for "${queryName}" failed, reason: ${err}`);
      }),
  }));

  const fetchPromises = Object.keys(fetchEndpoints).map(async (endpoint) => {
    const response = await fetch(fetchEndpoints[endpoint]).catch((err) => {
      throw new Error(`fetch "${endpoint}" failed, reason: ${err}`);
    });
    return {
      queryName: endpoint,
      result: await response.json(),
    };
  });

  const allPrimaryRequests = gqlPromises.concat(fetchPromises);

  Promise.allSettled(allPrimaryRequests).then((requests) => {
    //   For debugging
    console.dir(requests);
    console.dir(JSON.stringify(requests));

    requests.forEach((query) => {
      if (query.status === "rejected") {
        console.error(query.reason);
        return;
      }

      // Extract query's fulfilled value out
      const { value } = query;
      switch (value.queryName) {
        case "bannerArtwork":
          (() => {
            const {
              id,
              artistAccount,
              metadata: { name: artworkName, artist: artistName },
            } = value.result.editions[0];
            console.log(
              `Top Banner:
                        id: ${id}
                        ${artworkName} by ${artistName}
                        Artist adress: ${artistAccount}`
            );
          })();
          break;
        case "latestArtworks":
          (() => {
            console.log("Latest Artworks");

            value.result.editions.slice(0, 3).forEach((edition) => {
              const {
                id,
                artistAccount,
                metadata: { name: artworkName, artist: artistName },
                auctionEnabled,
                metadataPrice,
                reservePrice,
                totalAvailable,
              } = edition;

              // The price for "Place a bid" is not correct, just a placeholder
              console.log(
                `id: ${id}
                  ${artworkName} by ${artistName}
                  ${
                    auctionEnabled
                      ? "Place a bid (minimum)"
                      : reservePrice === "0"
                      ? "Buy now"
                      : "Reserve Price"
                  }
                  Ξ ${
                    auctionEnabled ? 0.1 : metadataPrice / 1000000000000000000
                  }
                  1/${totalAvailable}
                  Artist adress: ${artistAccount}`
              );
            });
          })();
          break;
        case "recentScheduledEditions":
        case "soonScheduledEditions":
          (() => {
            const isRecent = value.queryName === "recentScheduledEditions";
            console.log(
              `Upcoming sales: ${isRecent ? "Buy now" : "Starting Soon"}`
            );

            value.result[`${value.queryName}`].forEach((edition) => {
              const {
                id,
                artistAccount,
                metadata: { name: artworkName, artist: artistName },
                metadataPrice,
                totalAvailable,
                startDate,
              } = edition;

              const timeDifference = new Date(
                parseInt(startDate + "000") - Date.now()
              );

              console.log(
                `id: ${id}
                ${artworkName} by ${artistName}
                ${
                  metadataPrice === "0"
                    ? `Place a bid
                No reserve`
                    : `Buy Now
                Ξ ${metadataPrice / 1000000000000000000}`
                }
                1/${totalAvailable}
                ${
                  isRecent
                    ? ""
                    : `Sales starts in ${timeDifference.getUTCHours()} h ${timeDifference.getUTCMinutes()} m ${timeDifference.getUTCSeconds()} s`
                } 
                Artist adress: ${artistAccount}
                        `
              );
            });
          })();
          break;
        case "reserveAuctionsEndingSoon":
        case "reserveAuctionsStartingSoon":
          (() => {
            const isEndingSoon =
              value.queryName === "reserveAuctionsEndingSoon";
            console.log(
              `24hr Reserve Auctions: ${
                isEndingSoon ? "Ending Soon" : "Starting Soon"
              }`
            );

            value.result.reserveAuctionsStartingSoon.forEach((edition) => {
              const {
                id,
                artistAccount,
                metadata: { name: artworkName, artist: artistName },
                metadataPrice,
                totalAvailable,
                startDate,
              } = edition;

              const timeDifference = new Date(
                parseInt(startDate + "000") - Date.now()
              );

              console.log(
                `id: ${id}
                ${artworkName} by ${artistName}
                ${isEndingSoon ? "Current bid" : "Reserve price"}
                Ξ ${metadataPrice / 1000000000000000000}
                1/${totalAvailable}
                ${
                  isEndingSoon ? "Auction ends in" : "Sales starts in"
                } ${`${timeDifference.getUTCHours()} h ${timeDifference.getUTCMinutes()} m ${timeDifference.getUTCSeconds()} s`}
                Artist adress: ${artistAccount}
                        `
              );
            });
          })();
          break;
        case "bannersUrl":
          (() => {
            console.log("Banners:");
            console.dir(value.result.banners);
          })();
          break;
        default:
          console.error(`Unexpected query name: ${value.queryName}`);
      }
    });
  });
}
